package com.asu.MovieRecommender.Controllers;

import java.io.IOException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.asu.MovieRecommender.Constants.MovieRecommenderConstants;
import com.asu.MovieRecommender.Services.RegisterService;
import com.asu.MovieRecommender.User.Response;
import com.asu.MovieRecommender.User.User;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RegisterController {
	public static Logger logger = LogManager.getLogger(RegisterController.class);
	@Autowired
	RegisterService registerService;

	@Autowired
	private RestTemplate restTemplate;

	@RequestMapping(method = RequestMethod.POST, value = "/register/user/{operationType}")
	public @ResponseBody ResponseEntity<String> register(@RequestBody User userDefine,
			@PathVariable String operationType) {

		logger.info("Entering the Register User Method", userDefine);
		String password = userDefine.getUserPassword();
		ResponseEntity<Response> resp = registerService.addUser(userDefine, operationType);
		ObjectMapper map = new ObjectMapper();
		String json = "";
		try {
			json = map.writeValueAsString(resp.getBody());
		} catch (IOException e) {
			logger.error("Exception while getting the error passing!!!");
		}
		HttpHeaders responseHeaders = new HttpHeaders();
		System.out.println(resp);
		if (operationType.equals(MovieRecommenderConstants.OPERATION_TYPE_NEW_USER)
				&& resp.getBody().getStatusCode().equals("200")) {
			responseHeaders.set("MYSESSIONID", login(userDefine.getUserName(), password));
		}
		return ResponseEntity.ok().headers(responseHeaders).body(json);
	}

	private String login(String username, String password) {
		String sessionId = "";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "multipart/form-data");
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("username", username);
		map.add("password", password);
		HttpEntity<Object> request = new HttpEntity<Object>(map, headers);
		HttpEntity<String> response = restTemplate.exchange("http://localhost:8081/login", HttpMethod.POST, request,
				String.class);
		HttpHeaders responseHeaders = response.getHeaders();
		System.out.println(responseHeaders);
		final List<String> cooks = responseHeaders.get("Set-Cookie");
		System.out.println(cooks);
		String[] c = cooks.get(0).split(";");
		sessionId = c[0].substring("MYSESSIONID".length() + 1, c[0].length());

		return sessionId;
	}

}

