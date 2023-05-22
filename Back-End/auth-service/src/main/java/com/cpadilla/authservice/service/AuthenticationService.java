package com.cpadilla.authservice.service;

import com.cpadilla.authservice.entity.UserCredentialsEntity;
import com.cpadilla.authservice.model.AuthenticationRequest;
import com.cpadilla.authservice.model.AuthenticationResponse;
import com.cpadilla.authservice.model.CustomUserDetails;
import com.cpadilla.authservice.model.RegisterRequest;
import com.cpadilla.authservice.repository.UserCredentialsRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class AuthenticationService {

    @Autowired
    private UserCredentialsRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {

        var user = UserCredentialsEntity.builder()
                .name(request.getFirstname())
                .surname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(CustomUserDetails.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .build());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        if (authenticate.isAuthenticated()) {
            var user = repository.findByEmail(
                            request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getUsername()));
            var jwtToken = jwtService.generateToken(CustomUserDetails.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .build());
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } else {
            throw new RuntimeException("invalid access");
        }
    }

//    public String register(UserCredentialsEntity request) {
//        var pass = passwordEncoder.encode(request.getPassword());
//        log.info("PASSWORD: {}",pass);
//        var savedUser = repository.save(UserCredentialsEntity.builder()
//                .name(request.getName())
//                .surname(request.getSurname())
//                .email(request.getEmail())
//                .password(pass)
//                .build());
//
//        log.info("Saving user with id = {} from auth service layer", savedUser.getId());
//        return "user added to the sistem";
//    }

//    public String generateToken(String username) {
//        return jwtService.generateToken(username);
//    }
//
//    public void validateToken(String token) {
//        jwtService.validateToken(token);
//    }

//    @Value("${application.security.jwt.secret-key}")
//    private String secretKey;
//    @Value("${application.security.jwt.expiration}")
//    private long jwtExpiration;
//    @Value("${application.security.jwt.refresh-token.expiration}")
//    private long refreshExpiration;
//
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    public String generateToken(UserDetails userDetails) {
//        return generateToken(new HashMap<>(), userDetails);
//    }
//
//    public String generateToken(
//            Map<String, Object> extraClaims,
//            UserDetails userDetails
//    ) {
//        return buildToken(extraClaims, userDetails, jwtExpiration);
//    }
//
//    public String generateRefreshToken(
//            UserDetails userDetails
//    ) {
//        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
//    }
//
//    private String buildToken(
//            Map<String, Object> extraClaims,
//            UserDetails userDetails,
//            long expiration
//    ) {
//        return Jwts
//                .builder()
//                .setClaims(extraClaims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + expiration))
//                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    private Claims extractAllClaims(String token) {
//        return Jwts
//                .parserBuilder()
//                .setSigningKey(getSignInKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    private Key getSignInKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
}
