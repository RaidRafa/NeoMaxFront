emailjs.init("78s0f0hGN_NGHAP67");

const btn_submit = document.getElementById("enviar");

btn_submit.addEventListener("click", async function(event){  // async faz esperar a resposta da api para seguir para a proxima linha
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const proposta = document.getElementById("proposta").value;

    if(nome === "" || email === "" || proposta === ""){
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    btn_submit.innerText = "Enviando...";
    btn_submit.disabled = true;

    const templateParams = {
        nome: nome,
        email:email,
        proposta: proposta
    };

    try{                                                   // try e catch se o servidor estiver fora do ar o site não quebra, exibe que o servidor esta fora do ar
        const resposta = await emailjs.send('service_4hk253t', 'template_adjg0f9', templateParams);
        if(resposta.status == 200){
            document.getElementById("confirmar_proposta").style.display = "flex";
            document.getElementById("form-container").style.display = "none";
            console.log("Sucesso: E-mail enviado via EmailJS.");
        }
    }  catch(error){
        console.error("Erro no EmailJS: ", error);
        alert("Falha ao enviar e-mail. Tente novamente.");
    }  finally{
        btn_submit.innerText = "Enviar";
        btn_submit.disabled = false;
    } 
});
