import axios from "axios";

// Aşağıdaki Fonksiyonu değiştirmeyin.
async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

const ipAdresim = await ipAdresimiAl();
console.log(ipAdresim);

/*
  AMAÇ:
  - location_card.png dosyasındakine benzer dinamik bir card oluşturmak.
  - HTML ve CSS hazır, önce IP adresini, sonra bunu kullanarak diğer bilgileri alacağız.

	ADIM 1: IP kullanarak verileri almak
  getData fonskiyonunda axios kullanarak şu adrese GET sorgusu atacağız: https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen datayı geri dönmeli.

  Not: Request sonucu gelen datayı browserda network tabından inceleyin.
  İpucu: Network tabıından inceleyemezseniz GET isteklerini gönderdiğiniz URL'i direkt browserda açabildiğinizi unutmayın. 😉

  Bu fonksiyonda return ettiğiniz veri, Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor. Bu yüzden, veride hangi key-value çiftleri olduğunu inceleyin.
*/

async function getData() {
  
  const ip = await ipAdresimiAl();
  const response = await axios.get(`https://apis.ergineer.com/ipgeoapi/${ip}`);
 
  return response.data;
}


/*
	ADIM 2: Alınan veriyi sayfada gösterecek componentı oluşturmak
  getData ile aldığımız konum bazlı veriyi sayfada göstermek için cardOlustur fonskiyonu kullanılacak. DOM metodlarını ve özelliklerini kullanarak aşağıdaki yapıyı oluşturun ve dönün (return edin).

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';

	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

function cardOlustur(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  
  const flagImg = document.createElement("img");
  flagImg.src = `https://flaglog.com/codes/standardized-rectangle-120px/${data.ülkeKodu}.png`;
  card.appendChild(flagImg);

  
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  
  const ipElem = document.createElement("h3");
  ipElem.classList.add("ip");
  ipElem.textContent = data.sorgu;
  cardInfo.appendChild(ipElem);

  
  const ulkeElem = document.createElement("p");
  ulkeElem.classList.add("ulke");
  ulkeElem.textContent = `${data.ülke} (${data.ülkeKodu})`;
  cardInfo.appendChild(ulkeElem);

  
  const enlemBoylamElem = document.createElement("p");
  enlemBoylamElem.textContent = `Enlem: ${data.enlem} - Boylam: ${data.boylam}`;
  cardInfo.appendChild(enlemBoylamElem);

  
  const sehirElem = document.createElement("p");
  sehirElem.textContent = `Şehir: ${data.bölgeAdı}`;
  cardInfo.appendChild(sehirElem);

  
  const saatDilimiElem = document.createElement("p");
  saatDilimiElem.textContent = `Saat dilimi: ${data.saatdilimi}`;
  cardInfo.appendChild(saatDilimiElem);

  
  const paraBirimiElem = document.createElement("p");
  paraBirimiElem.textContent = `Para birimi: ${data.parabirimi}`;
  cardInfo.appendChild(paraBirimiElem);

  
  const ispElem = document.createElement("p");
  ispElem.textContent = `ISP: ${data.isp}`;
  cardInfo.appendChild(ispElem);

  
  card.appendChild(cardInfo);

  
  return card;
}

// Buradan sonrasını değiştirmeyin, burası yazdığınız kodu sayfaya uyguluyor.
getData().then((response) => {
  const cardContent = cardOlustur(response);
  const container = document.querySelector(".container");
  container.appendChild(cardContent);
});