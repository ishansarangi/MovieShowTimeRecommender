package com.asu.MovieRecommender.ws.themoviedb;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class NowPlayingMovies implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String date;
	
	public NowPlayingMovies(String date, Map<String, List<ShowDetails>> theatreShowDetails) {
		super();
		this.date = date;
		this.theatreShowDetails = theatreShowDetails;
	}
	public NowPlayingMovies() {
		
	}
	private Map<String,List<ShowDetails>> theatreShowDetails;
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Map<String, List<ShowDetails>> getMapShowDetails() {
		return theatreShowDetails;
	}
	public void setMapShowDetails(Map<String, List<ShowDetails>> theatreShowDetails) {
		this.theatreShowDetails = theatreShowDetails;
	}
}
