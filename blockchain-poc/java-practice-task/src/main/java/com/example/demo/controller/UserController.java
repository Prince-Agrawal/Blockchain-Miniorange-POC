package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Scanner;

@Controller
@Configuration
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Value("${xecurify.secret.customer_key}")
    private String customerKey;

    @Value("${xecurify.secret.customer_api_key}")
    private String apiKey;

    // used to render registration page
    @RequestMapping("/register")
    public String showForm(){
        return "contact";
    }

    // Call after registration form submit
    @RequestMapping(path = "/processForm" , method = RequestMethod.POST)
    public String handleForm(HttpServletRequest request){
        try {
            String email = request.getParameter("email");
            String username = request.getParameter("username");
            String phone_number = request.getParameter("number");
            User _user = userRepository.save(new User(email , username , phone_number));
            System.out.println("User detail after user registration " + _user);
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

    // used to render login page
    @RequestMapping("/login")
    public String showLoginForm(){
        return "login";
    }

    // call after login form submits
    // check if user exists or not , and if then call challenge api to send OTP.
    // and store txId to the session for verification
    @RequestMapping(path = "/loginForm" , method = RequestMethod.POST)
    public String handleLoginForm(HttpServletRequest request){
        try {
            String email = request.getParameter("email");
            String username = request.getParameter("username");

            // finding user from db.
            User _user = userRepository.findByEmail(email);

            System.out.println("User detail regarding login mail ID  " + _user);

            if(_user!=null){
                // challenge api code
                String currentTimeInMillis = String.valueOf(System.currentTimeMillis());
                String stringToHash = customerKey + currentTimeInMillis + apiKey;
                MessageDigest md = MessageDigest.getInstance("SHA-512");
                byte[] messageDigest = md.digest(stringToHash.getBytes());
                BigInteger no = new BigInteger(1, messageDigest);
                String hashValue = no.toString(16).toLowerCase();
                CloseableHttpClient client = HttpClients.createDefault();
                HttpPost postRequest = new HttpPost("https://login.xecurify.com/moas/api/auth/challenge");
                postRequest.setHeader("Customer-Key", customerKey);
                postRequest.setHeader("Timestamp", currentTimeInMillis);
                postRequest.setHeader("Authorization", hashValue);

                JSONObject json = new JSONObject();
                json.put("customerKey" , customerKey);
                json.put("username", "freestudy1009@gmail.com");
                json.put("authType", "EMAIL");
//                json.put("phone", "6377552654");
                StringEntity entity = new StringEntity(json.toString());

                entity.setContentType("application/json");
                postRequest.setEntity(entity);
                CloseableHttpResponse response = client.execute(postRequest);

                Scanner s = new Scanner(response.getEntity().getContent()).useDelimiter("\\A");
                String result = s.hasNext() ? s.next() : "";
                System.out.println("Result of challenge api " + result);
                client.close();

                HttpSession session = request.getSession(true);
                JSONObject jsonObj = new JSONObject(result);
                String status = jsonObj.getString("status");
                System.out.println("Challenge Api status "+ status);
                if(status.equals("FAILED")){
                    return "limitExceed";
                }
                session.setAttribute("txId", jsonObj.getString("txId"));
            }
            else{
                // if user not exists for given mail id.
                return "notExits";
            }

            // render OTP page.
            return "otp";
        } catch (Exception e) {
            return "error";
        }
    }

    // As user submit otp this is used to validate the otp using validate api.
    @RequestMapping(path = "/otpVerification" , method = RequestMethod.POST)
    public String handleOtpVerificationForm(HttpServletRequest request){
        try {

            // validate api
            String otp = request.getParameter("otp");
            HttpSession session = request.getSession(true);
            String currentTimeInMillis = String.valueOf(System.currentTimeMillis());
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
            json.put("txId" , session.getAttribute("txId"));
            json.put("token", otp);

            StringEntity entity = new StringEntity(json.toString());

            entity.setContentType("application/json");
            postRequest.setEntity(entity);

            CloseableHttpResponse response = client.execute(postRequest);
            Scanner s = new Scanner(response.getEntity().getContent()).useDelimiter("\\A");
            String result = s.hasNext() ? s.next() : "";
            JSONObject jsonObj = new JSONObject(result);

            System.out.println("Result of validate api result" + result);

            client.close();

            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

}
