package com.saul.padelManager.envioCorreos.controller;

import com.saul.padelManager.envioCorreos.model.CorreoRecord;
import com.saul.padelManager.envioCorreos.service.CorreoService;
import com.saul.padelManager.utils.ConstantesProyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ConstantesProyecto.BASE_API_PATH)
public class EnviarCorreosController {
    @Autowired
    private CorreoService correoService;

    @PostMapping("/enviar-correo")
    public ResponseEntity<String> enviarCorreo(@RequestBody CorreoRecord solicitudBody) {
        String correoDestinatario = solicitudBody.destinatario();
        System.out.println(correoDestinatario);
        try {
            correoService.enviarCorreoBienvenida(correoDestinatario);
            return ResponseEntity.ok("Correo enviado con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar el correo: " + e.getMessage());
        }
    }
}
