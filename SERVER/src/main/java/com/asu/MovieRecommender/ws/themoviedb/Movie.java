package com.asu.MovieRecommender.ws.themoviedb;

import org.apache.commons.lang.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @author leharbhatt JSONObject mapper to map internationMovieAPI results to
 *         Java Object
 */
@JsonIgnoreProperties(ignoreUnknown = true, value = { "movieMap", "nowPlayingMoviesId" })
public class Movie {
	private int id;
	private String title;
	@JsonProperty("poster_path")
	private String poster_image_thumbnail;
	private String backdrop_path;
	private String overview;

	public Movie() {
	}

	public Movie(int id, String title, String poster_image_thumbnail) {
		super();
		this.id = id;
		this.title = title;
		this.poster_image_thumbnail = poster_image_thumbnail;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPoster_image_thumbnail() {
		return poster_image_thumbnail;
	}

	public void setPoster_image_thumbnail(String poster_image_thumbnail) {
		if(StringUtils.isNotBlank(poster_image_thumbnail)) {
			this.poster_image_thumbnail = "http://image.tmdb.org/t/p/original"+poster_image_thumbnail;
		}
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "Movie [id=" + this.id  + ", title=" + this.title + ", poster_image_thumbnail="
				+ this.poster_image_thumbnail + "]";
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getBackdrop_path() {
		return backdrop_path;
	}

	public void setBackdrop_path(String backdrop_path) {
		this.backdrop_path = "http://image.tmdb.org/t/p/original"+backdrop_path;
	}
}
