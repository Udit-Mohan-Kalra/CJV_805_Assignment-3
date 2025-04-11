package MyVideoStore.content;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import MyVideoStore.content.Models.Media;
import MyVideoStore.content.Models.MediaRepository;

@Service
public class MediaService {
    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    //Creating new media content.
    public Media createMedia(Media media) {
        return mediaRepository.save(media);
    }

    //Getting all the media content.
    public List<Media> getAllMedia(){
        return mediaRepository.findAll();
    }

    //Getting only the movies.
    public List<Media> getAllMoviesOnly(){
        return mediaRepository.findByTypeIgnoreCase("movie");
    }

    //Getting only the tv-shows.
    public List<Media> getAllTVShowsOnly(){
        return mediaRepository.findByTypeIgnoreCase("tv_show");
    }

    //To search by title.
    public List<Media> searchMoviesByTitle(String title){
        return mediaRepository.findByNameContainingIgnoreCase(title);
    }

    //To get all the movies.
    public List<Media> getFeaturedMovies() {
        return mediaRepository.findByIsFeaturedTrueAndTypeIgnoreCase("movie");
    }

    //To get all the featured tv-shows.
    public List<Media> getFeaturedTV_Shows() {
        return mediaRepository.findByIsFeaturedTrueAndTypeIgnoreCase("tv_show");
    }

    //To get a media content by its id.
    public Optional<Media> getMovieOrTVShowById(String id) {
        return mediaRepository.findById(id);  
    }

    // To delete the media content by its id.
    public void deleteMedia(String id) {
        mediaRepository.deleteById(id);
    }
    
}
