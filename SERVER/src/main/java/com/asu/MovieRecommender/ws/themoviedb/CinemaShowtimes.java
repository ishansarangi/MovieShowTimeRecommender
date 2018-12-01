package com.asu.MovieRecommender.ws.themoviedb;

import java.io.Serializable;
import java.util.List;

public class CinemaShowtimes implements Serializable {

	
	private String cinemaName;
	public CinemaShowtimes(String cinemaName, List<ShowDetails> showDetails) {
		super();
		this.cinemaName = cinemaName;
		this.showDetails = showDetails;
	}
	public CinemaShowtimes()
	{
		
	}
	private List<ShowDetails> showDetails;
	public String getCinemaName() {
		return cinemaName;
	}
	public void setCinemaName(String cinemaName) {
		this.cinemaName = cinemaName;
	}
	public List<ShowDetails> getShowDetails() {
		return showDetails;
	}
	public void setShowDetails(List<ShowDetails> showDetails) {
		this.showDetails = showDetails;
	}
}
