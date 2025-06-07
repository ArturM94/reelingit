package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ArturM94/reelingit/models"
)

type MovieHandler struct {
	// TODO
}

func (h *MovieHandler) GetTopMovies(w http.ResponseWriter, r *http.Request) {
	movies := []models.Movie{
		{
			ID:          1,
			TMDB_ID:     1,
			Title:       "The Hacker",
			ReleaseYear: 2022,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Artur", LastName: "Manukian"}},
		},
		{
			ID:          2,
			TMDB_ID:     2,
			Title:       "Back to the Future",
			ReleaseYear: 1984,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{},
			Casting:     []models.Actor{{ID: 1, FirstName: "Artur", LastName: "Manukian"}},
		},
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(movies); err != nil {
		// TODO: log error
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}
