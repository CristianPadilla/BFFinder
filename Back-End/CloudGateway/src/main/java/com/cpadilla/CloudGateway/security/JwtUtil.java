package com.cpadilla.CloudGateway.security;

import com.cpadilla.CloudGateway.exception.JwtExpiredException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.header.Header;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Log4j2
public class JwtUtil {

    //encryption key generated online, remember the minimum size for jwt is 256 bit
    private static final String SECRET_KEY = "5367566B59703373367638792F423F4528482B4D6251655468576D5A71347437";


    public void validateToken(final String token) {
        log.info("11 Validating token: " + token);
        Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        log.info("22 Validating token: " + token);
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        log.info("33 Validating token: " + token);
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    public String extractUsername(String token) {
        log.info("hola7 XX Validating token: ");
        return extractClaim(token, Claims::getSubject); //subject must be username or userEmail at jwt
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        log.info("hola8 XX Validating token: ");
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
//        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
//        } catch (ExpiredJwtException e) {
//            throw new JwtExpiredException(e.getMessage());
//        }

    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY); //decode secret key
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
