function calcular() {

    var porcentagemReducao = 0.25
    var custoProducaoEstimada = custoProducao.value * hectares.value
    var reducaoEstimada = (custoProducao.value * porcentagemReducao) * hectares.value


    if (custoProducaoEstimada >= 2000000000) {

        custoProducaoEstimada = custoProducaoEstimada / 1000000000 + ' Bilhões'

    }
    if (custoProducaoEstimada >= 1000000000) {

        custoProducaoEstimada = custoProducaoEstimada / 1000000000 + ' Bilhão'

    }
    if (custoProducaoEstimada >= 2000000) {

        custoProducaoEstimada = custoProducaoEstimada / 1000000 + ' Milhões'

    }
    if (custoProducaoEstimada >= 1000000) {

        custoProducaoEstimada = custoProducaoEstimada / 1000000 + ' Milhão'

    }
    if (custoProducaoEstimada >= 10000) {

        custoProducaoEstimada = custoProducaoEstimada / 1000 + ' Mil'

    }

    if (reducaoEstimada >= 2000000000) {

        reducaoEstimada = reducaoEstimada / 1000000000 + ' Bilhões'

    }
    if (reducaoEstimada >= 1000000000) {

        reducaoEstimada = reducaoEstimada / 1000000000 + ' Bilhão'

    }
    if (reducaoEstimada >= 2000000) {

        reducaoEstimada = reducaoEstimada / 1000000 + ' Milhões'

    }
    if (reducaoEstimada >= 1000000) {

        reducaoEstimada = reducaoEstimada / 1000000 + ' Milhão'

    }
    if (reducaoEstimada >= 10000) {

        reducaoEstimada = reducaoEstimada / 1000 + ' Mil'

    }
    div_simule.innerHTML = "";
    div_simule.innerHTML = `<style>
    .simule .txt_simule .calculo{
       
        display: flex;
        justify-content: center;
    }
    .simule .txt_simule .calculo p{
        font-size: 4.5vh;
        color: #393a22;
    }
    .simule .txt_simule .calculo hr{
        color: #ffffff;
        height: 1vh;
    }
    
    </style>
    <h2>Simule aqui</h2>
    <br>
    <div id="calculo">
    <div class="textoCol2" id="item4">
    <br><p>O custo total da sua produção atual é de <span class="roxo_escuro"><b>R$${custoProducaoEstimada}</b></span>. </p>
    <hr>
    <p> Utilizando o nosso monitoramento de temperatura e umidade, 
    a sua produção terá uma <span class="roxo_escuro"><b>redução de perdas</b></span> total de até <span class="roxo_escuro"><b>R$${reducaoEstimada}</b></span></p>
    </div>
    </div>
    <br>
    <button onclick="voltar()">Voltar</button>`
};
function voltar() {
    location.reload();
}
    
