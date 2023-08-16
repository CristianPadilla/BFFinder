package com.cpadilla.authservice.model;

import com.cpadilla.authservice.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {

    private String username;
    private String password;

//    @Enumerated(EnumType.STRING)
//    private Role role;


    public CustomUserDetails(UserEntity userCredentials) {
        this.username = userCredentials.getEmail();
        this.password = userCredentials.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of(new SimpleGrantedAuthority(role.name()));
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
