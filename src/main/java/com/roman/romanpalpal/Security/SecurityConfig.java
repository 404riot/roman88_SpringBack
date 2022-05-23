package com.roman.romanpalpal.Security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception
    {
        web.ignoring().antMatchers("/css/**", "/script/**", "image/**", "/fonts/**", "lib/**", "/**");
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
//        http.authorizeRequests()
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/**").permitAll();

        http.csrf().disable().authorizeRequests().mvcMatchers("/", "/account/**", "/signIn**", "/signUp**").permitAll()   // 해당 요청은 모두 허용
        .mvcMatchers("/admin").hasRole("ADMIN")     // admin 요청은 ADMIN 권한을 가져야 허용
        .mvcMatchers("/member").hasRole("MEMBER").anyRequest().authenticated();     // 이외의 요청은 권한이 있기만 하면 허용

        http.formLogin().loginPage("/api/Sign/SignAccount").permitAll();      // spring security 에서 제공하는 기본 login Page 대신 커스텀 페이지를 사용
        http.httpBasic();       // http 기본 인증 구성
        http.logout().logoutSuccessUrl("/");  // 커스텀시 logout 을 담당하는 Filter 를 사용할 수 없으므로 logout 후 이동할 페이지 지정.
    }
}