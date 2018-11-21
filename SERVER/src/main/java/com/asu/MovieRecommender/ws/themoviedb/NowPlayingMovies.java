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
	
	
	public NowPlayingMovies(String date,  List<CinemaShowtimes> theatreShowDetails) {
		super();
		this.date = date;
		this.theatreShowDetails = theatreShowDetails;
	}
	public NowPlayingMovies() {
		
	}
	private List<CinemaShowtimes> theatreShowDetails;
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public List<CinemaShowtimes> getTheatreShowDetails() {
		return theatreShowDetails;
	}
	public void setTheatreShowDetails(List<CinemaShowtimes> theatreShowDetails) {
		this.theatreShowDetails = theatreShowDetails;
	}
	
}
