package com.example.demo;

import com.example.demo.model.User;
import org.apache.commons.codec.Charsets;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;
import org.springframework.boot.context.properties.bind.BindResult;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Scanner;

@RestController
//@Controller
public class HelloController {

//    @GetMapping("/")
//    public String index() {
//        return "Greetings from Spring Boot!";
//    }
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject("https://api.publicapis.org/entries" , String.class);
//        return result;


    @GetMapping("/challenge")
    public String challengeRestApi() throws NoSuchAlgorithmException, IOException {
        String customerKey = "293640";
        String apiKey = "qDzFbIBgxgvZkIKzyb30biTfF18iCqiT";
        /* Current time in milliseconds since
        midnight, January 1, 1970 UTC. */
        String currentTimeInMillis = String.valueOf(System.currentTimeMillis());
        /* Creating the Hash using
        SHA-512 algorithm (Apache Shiro library) */
        String stringToHash = customerKey + currentTimeInMillis + apiKey;

        MessageDigest md = MessageDigest.getInstance("SHA-512");
        byte[] messageDigest = md.digest(stringToHash.getBytes());

        // Convert byte array into signum representation
        BigInteger no = new BigInteger(1, messageDigest);

        // Convert message digest into hex value
        String hashValue = no.toString(16).toLowerCase();

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost postRequest = new HttpPost("https://login.xecurify.com/moas/api/auth/challenge");
        postRequest.setHeader("Customer-Key", customerKey);
        postRequest.setHeader("Timestamp", currentTimeInMillis);
        postRequest.setHeader("Authorization", hashValue);



        JSONObject json = new JSONObject();
        json.put("customerKey" , customerKey);
        json.put("username", "princeagrawal1009@gmail.com");
        json.put("authType", "EMAIL");
        json.put("phone", "6377552654");

        StringEntity entity = new StringEntity(json.toString());

        entity.setContentType("application/json");
        postRequest.setEntity(entity);

        CloseableHttpResponse response = client.execute(postRequest);
        System.out.println("ddddddddddddddddddddddddddddddd");
        System.out.println( response.getEntity().getContent());
        System.out.println("ddddddddddddddddddddddddddddddd");

        Scanner s = new Scanner(response.getEntity().getContent()).useDelimiter("\\A");
        String result = s.hasNext() ? s.next() : "";


        client.close();
        return result;
    }

    @GetMapping("/verify")
    public String verifyRestApi() throws NoSuchAlgorithmException, IOException {
        String customerKey = "292980";
        /* The customer API Key provided to you */
        String apiKey = "ezvnnJFq4Zmp6vc5k6jWYm8ckoOsd14n";
        /* Current time in milliseconds since
        midnight, January 1, 1970 UTC. */
        String currentTimeInMillis = String.valueOf(System.currentTimeMillis());
        /* Creating the Hash using
        SHA-512 algorithm (Apache Shiro library) */
        String stringToHash = customerKey + currentTimeInMillis + apiKey;

        MessageDigest md = MessageDigest.getInstance("SHA-512");
        byte[] messageDigest = md.digest(stringToHash.getBytes());

        // Convert byte array into signum representation
        BigInteger no = new BigInteger(1, messageDigest);

        // Convert message digest into hex value
        String hashValue = no.toString(16).toLowerCase();

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost postRequest = new HttpPost("https://login.xecurify.com/moas/api/auth/validate");
        postRequest.setHeader("Customer-Key", customerKey);
        postRequest.setHeader("Timestamp", currentTimeInMillis);
        postRequest.setHeader("Authorization", hashValue);



        JSONObject json = new JSONObject();
        json.put("txId" , "f8b8278d-34b0-11ed-bff9-0ed0f367cea7");
        json.put("token", "209500");

        StringEntity entity = new StringEntity(json.toString());

        entity.setContentType("application/json");
        postRequest.setEntity(entity);

        CloseableHttpResponse response = client.execute(postRequest);
//        System.out.println("ddddddddddddddddddddddddddddddd");
//        System.out.println(response.getStatusLine().getStatusCode());
//        System.out.println("ddddddddddddddddddddddddddddddd");

        Scanner s = new Scanner(response.getEntity().getContent()).useDelimiter("\\A");
        String result = s.hasNext() ? s.next() : "";


        client.close();
        return result;
    }

}