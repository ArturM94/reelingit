package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/ArturM94/reelingit/data"
	"github.com/ArturM94/reelingit/handlers"
	"github.com/ArturM94/reelingit/logger"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")

	if err != nil {
		log.Fatalf("Failed to initialize logger %v", err)
		return nil
	}

	defer logInstance.Close()

	return logInstance
}

func main() {
	logInstance := initializeLogger()

	if err := godotenv.Load(); err != nil {
		log.Fatal("No .env file was available")
	}

	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		log.Fatal("DATABASE_URL not set")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to connect to the DB: %v", err)
	}
	defer db.Close()

	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize Movie repository")
	}

	movieHandler := handlers.NewMovieHandler(movieRepo, logInstance)

	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	http.HandleFunc("/api/movies/search", movieHandler.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandler.GetMovie)
	http.HandleFunc("/api/genres", movieHandler.GetGenres)

	http.Handle("/", http.FileServer(http.Dir("public")))

	const addr = ":8080"
	err = http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
