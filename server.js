import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Validar dados
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateFormData = (data) => {
  const { nome, empresa, cargo, telefone, email, solucao } = data;
  
  if (!nome || nome.trim().length < 2) {
    return { valid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
  }
  
  if (!empresa || empresa.trim().length < 2) {
    return { valid: false, error: 'Nome da empresa é obrigatório' };
  }
  
  if (!cargo || cargo.trim().length < 2) {
    return { valid: false, error: 'Cargo é obrigatório' };
  }
  
  const cleanedPhone = telefone.replace(/\D/g, '');
  if (!cleanedPhone || cleanedPhone.length < 10) {
    return { valid: false, error: 'Telefone deve ter pelo menos 10 dígitos' };
  }
  
  if (!validateEmail(email)) {
    return { valid: false, error: 'Endereço de e-mail inválido' };
  }
  
  if (!solucao) {
    return { valid: false, error: 'Solução é obrigatória' };
  }
  
  return { valid: true };
};

// Rota para agendamento
app.post('/api/agendamento', async (req, res) => {
  try {
    const { nome, empresa, cargo, telefone, email, solucao } = req.body;
    
    // Validar dados
    const validation = validateFormData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Email para o cliente
    const clientMsg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'contato@gedisa.com.br',
      subject: 'Agendamento confirmado - Gedisa Energia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff5c00;">Agendamento Confirmado!</h2>
          <p>Olá <strong>${nome}</strong>,</p>
          <p>Recebemos sua solicitação de agendamento com sucesso.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #080808;">Dados do Agendamento:</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Empresa:</strong> ${empresa}</p>
            <p><strong>Cargo:</strong> ${cargo}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Solução:</strong> ${solucao}</p>
          </div>
          
          <p>Entraremos em contato em breve para confirmar a data e hora da apresentação.</p>
          <p>Obrigado por escolher a Gedisa Energia!</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            © 2026 Gedisa - Geração Distribuída SA<br>
            CNPJ: 32.060.301/0001-05
          </p>
        </div>
      `,
    };

    // Email para administrador
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || 'admin@gedisa.com.br',
      from: process.env.SENDGRID_FROM_EMAIL || 'contato@gedisa.com.br',
      subject: `Novo Agendamento - ${nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff5c00;">Novo Agendamento Recebido</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Empresa:</strong> ${empresa}</p>
            <p><strong>Cargo:</strong> ${cargo}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Solução:</strong> ${solucao}</p>
            <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      `,
    };

    // Enviar emails
    await Promise.all([
      sgMail.send(clientMsg),
      sgMail.send(adminMsg),
    ]);

    res.status(200).json({ 
      success: true, 
      message: 'Agendamento enviado com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ seu agendamento. Tente novamente em alguns momentos
      error: 'Erro ao processar agendamento. Tente novamente mais tarde.' 
    });
  }
});

// Rota para newsletter
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'Endereço de e-mail inválido' });
    }

    // Email de confirmação
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'contato@gedisa.com.br',
      subject: 'Bem-vindo à Newsletter Gedisa Energia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff5c00;">Bem-vindo!</h2>
          <p>Obrigado por assinar nossa newsletter.</p>
          <p>A partir de agora você receberá as melhores notícias, tendências e soluções em energia renovável direto em seu email.</p>
          
          <p style="margin-top: 30px;">Se tiver alguma dúvida, entre em contato conosco!</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            © 2026 Gedisa - Geração Distribuída SA<br>
            CNPJ: 32.060.301/0001-05
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);

    res.status(200).json({ 
      success: true, 
      message: 'Email adicionado à newsletter com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao adicionar newsletter:', error);
    res.status(500).json({ 
      error: 'Erro ao processar sua inscrição na newsletter. Tente novamente em alguns momentos.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
