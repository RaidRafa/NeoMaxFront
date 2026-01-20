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
    try{                                                   // try e catch se o servidor estiver fora do ar o site não quebra, exibe que o servidor esta fora do ar
        const resposta = await fetch('https://neomax.onrender.com/api/requisicao', {  // await faz esperar a resposta da api para seguir para a proxima linha
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nome, email, proposta})
        });

        if(resposta.ok){                                   // Verifica se os status do http foi um sucesso(200 ou 201)
            const confirmado = document.getElementById("confirmar_proposta");
            const confirmar = document.getElementById("form-container");

            confirmado.style.display = "flex";
            confirmar.style.display = "none";

            console.log("Sucesso: Proposta enviada ao servidor.");
        }else{
            alert("Erro no servidor. Tente novamente mais tarde.")
        }
        }catch(error){
            console.error("Erro na requisição: ", error);
            alert("Falha na conexão. Verifique sua internet.");
    }

});