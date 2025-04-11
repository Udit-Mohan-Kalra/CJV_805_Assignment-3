package MyVideoStore.content;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import MyVideoStore.content.Models.User;
import MyVideoStore.content.Models.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Instantiate BCryptPasswordEncoder directly
    }

    public String registerUser(User user) {
        // Check if the email already exists.
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already in use";
        }

        // Encrypt the password.
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // Save the user in the database
        userRepository.save(user);
        return "User registered successfully";
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        // Verify the password.
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public Optional<User> getUserById(String id) {
        // Retrieve the user from the database.
        return userRepository.findById(id);
    }

    // To authenticate a user.
    public boolean authenticateUser(String email, String password) {
        // Check if the user exists by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            // User exists, now verify the password
            User user = userOptional.get();
            return passwordEncoder.matches(password, user.getPassword()); // Compares the hashed password.
        }
        return false; // If user does not exist
    }
    
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
