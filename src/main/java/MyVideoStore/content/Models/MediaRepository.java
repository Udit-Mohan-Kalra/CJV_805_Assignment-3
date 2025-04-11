package MyVideoStore.content.Models;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MediaRepository extends MongoRepository<Media, String> {
    List<Media> findByTypeIgnoreCase(String type); //Finding the list of media based on the type.
    List<Media> findByNameContainingIgnoreCase(String title); //Finding the list of media based on title.
    List<Media> findByIsFeaturedTrueAndTypeIgnoreCase(String type); //To return only that media where isFeatured is True.
    Optional<Media> findById(String id); //Finding media by id.
}
