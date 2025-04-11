package MyVideoStore.content.Controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import MyVideoStore.content.MediaService;
import MyVideoStore.content.Models.Media;

@CrossOrigin(origins = "*") // Allowing cross-origin requests from all the origin.
@RestController
@RequestMapping("/media") //Defining base URL for all media endpoints.
public class MediaController {

    private final MediaService mediaService;

    @Autowired
    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping
    public ResponseEntity<Object> createMedia(@RequestBody Media media) {
        //Making the below fields required.
        if(media.getName() == null || media.getName().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name is required");
        }
        if(media.getType() == null || (!media.getType().equalsIgnoreCase("movie") && !media.getType().equalsIgnoreCase("tv_show"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Type is required");
        }
        if(media.getSynopsis() == null || media.getSynopsis().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Synopsis is required");
        }
        if(media.getSmallPoster() == null || media.getSmallPoster().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("smallPoster is required");
        }
        if(media.getLargePoster() == null || media.getLargePoster().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("largePoster is required");
        }
        if(media.getPurchasePrice() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("purchasePrice must be greater than 0");
        }
        if(media.getRentPrice() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("rentPrice must be greater than 0");
        }
        
        Media createMedia = mediaService.createMedia(media);
        return ResponseEntity.status(HttpStatus.CREATED).body(createMedia);
    }

    @GetMapping
    public ResponseEntity<List<Media>> getAllMedia(){
        List<Media> media = mediaService.getAllMedia();
        return ResponseEntity.ok(media);
    }

    //To fetch only-movies.
    @GetMapping("/only-movies")
    public ResponseEntity<List<Media>> getAllMoviesOnly(){
        List<Media> movies = mediaService.getAllMoviesOnly();
        return ResponseEntity.ok(movies);
    }

    //To fetch only-tv-shows.
    @GetMapping("/only-tv-shows")
    public ResponseEntity<List<Media>> getAllTVShowsOnly(){
        List<Media> tv_shows = mediaService.getAllTVShowsOnly();
        return ResponseEntity.ok(tv_shows);
    }

    //To fetch all movies and tv-shows by title.
    @GetMapping("/search")
    public ResponseEntity<List<Media>> searchMoviesByTitle(@RequestParam String title) {
        List<Media> media = mediaService.searchMoviesByTitle(title);
        return ResponseEntity.ok(media);
    }

    //To fetch all the featured movies.
    @GetMapping("/featured-movies")
    public ResponseEntity<List<Media>> getFeaturedMovies(@RequestParam(required = false) boolean featured) {
        // If featured=true, return only featured movies.
        if (featured) {
            List<Media> featuredMovies = mediaService.getFeaturedMovies();
            return ResponseEntity.ok(featuredMovies);
        } else {
            return ResponseEntity.badRequest().body(null); // Returning a bad request if no valid query string.
        }
    }

    //To fetch all the featured tv-shows.
    @GetMapping("/featured-tv-shows")
    public ResponseEntity<List<Media>> getFeaturedTV_Shows(@RequestParam(required = false) boolean featured) {
        // If featured=true, return only featured tv-shows
        if (featured) {
            List<Media> featuredTV_Shows = mediaService.getFeaturedTV_Shows();
            return ResponseEntity.ok(featuredTV_Shows);
        } else {
            return ResponseEntity.badRequest().body(null); // Returning a bad request if no valid query string.
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMovieOrTVShowById(@PathVariable String id) {
        // Validating the ID and return the movie/TV show if found.
        Optional<Media> media = mediaService.getMovieOrTVShowById(id);

        // Checking if the movie or TV show is present.
        if (media.isPresent()) {
            return ResponseEntity.ok(media.get());
        } else {
            // Returning 404 Not Found if the ID is invalid or not found.
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error 404 : Movie or TV Show with ID " + id + " not found");
        }
    }

    //To update the movie or tv-show.
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMedia(@PathVariable String id, @RequestBody Media updatedMedia) {
        // Checking if the movie exists (by id).
        Optional<Media> existingMedia = mediaService.getMovieOrTVShowById(id);
        if (!existingMedia.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error 404 : Movie or TV Show with ID " + id + " not found");
        }

        // Validating the incoming data.
        if (updatedMedia.getName() == null || updatedMedia.getName().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name is required");
        }

        if (updatedMedia.getType() == null || !updatedMedia.getType().equalsIgnoreCase("movie") && !updatedMedia.getType().equalsIgnoreCase("tv_show")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Type is required");
        }
        if (updatedMedia.getSynopsis() == null || updatedMedia.getSynopsis().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Synopsis is required");
        }
        if (updatedMedia.getType() == null || updatedMedia.getType().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("type is required");
        }
        if (updatedMedia.getSmallPoster() == null || updatedMedia.getSmallPoster().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("smallPoster is required");
        }
        if (updatedMedia.getLargePoster() == null || updatedMedia.getLargePoster().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("largePoster is required");
        }
        if (updatedMedia.getPurchasePrice() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("purchasePrice must be greater than 0");
        }
        if (updatedMedia.getRentPrice() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("rentPrice must be greater than 0");
        }
        
        // Updating the fields.
        Media mediaToUpdate = existingMedia.get();
        mediaToUpdate.setName(updatedMedia.getName());
        mediaToUpdate.setSynopsis(updatedMedia.getSynopsis());
        mediaToUpdate.setType(updatedMedia.getType());
        mediaToUpdate.setSmallPoster(updatedMedia.getSmallPoster());
        mediaToUpdate.setLargePoster(updatedMedia.getLargePoster());
        mediaToUpdate.setPurchasePrice(updatedMedia.getPurchasePrice());
        mediaToUpdate.setRentPrice(updatedMedia.getRentPrice());
        mediaToUpdate.setFeatured(updatedMedia.isFeatured());

        // Saving the updated media.
        Media savedMedia = mediaService.createMedia(mediaToUpdate); // Using createMedia to save.

        return ResponseEntity.ok(savedMedia); // Returning updated media.
    }

    //To delete the movie or tv-show.
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMedia(@PathVariable String id) {
        // Check if movie exists (by id).
        // If not, return 404 Not Found.
        Optional<Media> existingMedia = mediaService.getMovieOrTVShowById(id);
        if (!existingMedia.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(" Error 404 : Movie or TV Show with ID " + id + " not found");
        }

        // Deleting the movie.
        mediaService.deleteMedia(id);

        // Returning the  response.
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
    
}
