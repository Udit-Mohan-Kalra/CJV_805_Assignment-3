package MyVideoStore.content.Controllers;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import MyVideoStore.content.UserService;
import MyVideoStore.content.Models.LoginResponse;
import MyVideoStore.content.Models.User;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*") // Allowing cross-origin requests from all the origin.
@RestController
@RequestMapping("/users") //Defining base URL for all users end points.
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // User registration endpoint
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody @Valid User user) {
        // Validating email format
        if (user.getEmail() == null || !user.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email format");
        }

        // Service call to register the user
        String registrationResult = userService.registerUser(user);
        if (registrationResult.equals("Email already in use")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already in use");
        }

        // Returning success message with the generated user ID
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully. ID: " + user.getId());
    }

    // To retrive user by id.
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable String id) {

        // Retrieve the user and associated information
        Optional<User> user = userService.getUserById(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with ID: " + id);
        }

        // Return the user and associated information
        return ResponseEntity.ok(user.get());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticateUser(@RequestBody User credentials) {
    // Validating the email format
    if (credentials.getEmail() == null || !credentials.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email format");
    }

    // Validating the password is not empty
    if (credentials.getPassword() == null || credentials.getPassword().isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password cannot be empty");
    }

    // Authenticating the user
    boolean isAuthenticated = userService.authenticateUser(credentials.getEmail(), credentials.getPassword());
    if (isAuthenticated) {
        User user = userService.findUserByEmail(credentials.getEmail()).orElse(null);
        //Checking if the user is found or not.
        if (user != null) {
            // Creating a response object with user details and returning it.
            LoginResponse response = new LoginResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User data retrieval failed.");
        }
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
  }

}