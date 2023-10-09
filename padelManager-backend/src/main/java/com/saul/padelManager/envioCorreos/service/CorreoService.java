package com.saul.padelManager.envioCorreos.service;

import com.saul.padelManager.envioCorreos.plantillas.CorreosPlantillas;
import com.saul.padelManager.gestionUsuarios.repository.UsuarioRepository;
import com.saul.padelManager.security.security.JwtUtils;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CorreoService {

    @Autowired
    private JavaMailSender mailSender;

    private CorreosPlantillas correosPlantillas;

    public void enviarCorreoBienvenida(String destinatario) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(destinatario);
        helper.setSubject("Bienvenido a PadelManager");
        helper.setText(this.correosPlantillas.correoBienvenida,true);
        mailSender.send(message);
    }
}
