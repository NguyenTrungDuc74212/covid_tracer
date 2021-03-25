get_covid_word();
get_covid_country();
get_select_country();
const btnselect = document.querySelector('.custom-select');
console.log(btnselect);
btnselect.addEventListener('click',function(e){
	const id = btnselect.value;
	fetch(`https://coronavirus-tracker-api.herokuapp.com/v2/locations/${id}`).then(res=>res.json()
		.then(data=>{
			console.log(data);
			let code = data.location.country_code;
			let quocgia = data.location.country;
			let province = data.location.province
			let update = data.location.last_updated;
			let danso = data.location.country_population;
			let canhiem = data.location.latest.confirmed;
			let tuvong = data.location.latest.deaths;
			let hoiphuc = data.location.latest.recovered;

			document.querySelector('.box-vn').innerHTML = quocgia+"-"+province.toLocaleString("en");
			document.querySelector('.capnhat').innerHTML = update.substring(0,10);
			document.querySelector('.danso').innerHTML = danso.toLocaleString("en");
			document.querySelector('.binhiem').innerHTML = canhiem.toLocaleString("en");
			// document.querySelector('.hoiphuc').innerHTML = hoiphuc.toLocaleString("en");
			document.querySelector('.phantram').innerHTML =(Number(tuvong)/Number(canhiem)*100)
			.toLocaleString("en",{minimumFractionDigits:2,maximumFractionDigits:2})+"%";
   	}

   	)).catch(error=>console.error('error'));;
});
function numberFormat(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1))
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	return x1 + x2;
}
function get_covid_country()
{
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/269').then(res=>res.json()
		.then(data=>{
			console.log(data);
			const id = data.location.id;
			const code = data.location.country_code;
			const quocgia = data.location.country;
			const update = data.location.last_updated;
			const danso = data.location.country_population;
			const canhiem = data.location.latest.confirmed;
			const tuvong = data.location.latest.deaths;
			const hoiphuc = data.location.latest.recovered;

			// document.querySelector('.code').innerHTML = code.toLocaleString("en");
			// document.querySelector('.quocgia').innerHTML = quocgia.toLocaleString("en");
			document.querySelector('.capnhat').innerHTML = update.substring(0,10);
			document.querySelector('.danso').innerHTML = danso.toLocaleString("en");
			document.querySelector('.binhiem').innerHTML = canhiem.toLocaleString("en");
			// document.querySelector('.hoiphuc').innerHTML = hoiphuc.toLocaleString("en");
			document.querySelector('.phantram').innerHTML =(Number(tuvong)/Number(canhiem)*100)
			.toLocaleString("en",{minimumFractionDigits:2,maximumFractionDigits:2})+"%";
   		// document.querySelector('.hoiphuc').innerHTML = hoiphuc.toLocaleString("en");

   	}

   	)).catch(error=>console.error('error'));
}
function get_covid_word()
{
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations').then(res=>res.json()
		.then(data=>{
			console.log(data);
			const tongcanhiem = data.latest.confirmed;
			const tongchet = data.latest.deaths;
			const hoiphuc = data.latest.recovered;
			document.querySelector('.total_infected').innerHTML=tongcanhiem.toLocaleString("en")+" "+"ca nhiễm";
			document.querySelector('.total_dead').innerHTML=tongchet.toLocaleString("en")+" "+"tử vong";
			document.querySelector('.total_rehibilitate').innerHTML=hoiphuc.toLocaleString("en")+" "+"hồi phục";
			const html = data.locations.map((covid) => {
				const quocgia = covid.country;
				const danso = covid.country_population;
				const canhiem = covid.latest.confirmed;
				const tuvong = covid.latest.deaths;
				const hoiphuc = covid.latest.recovered;
				const update = covid.last_updated;

				return `<div class="col-lg-4" insert style="margin:12px 0px;">
				<div class="card border border-dark" style="width: 18rem;background:#009688;">
				<div class="card-body">
				<h5 class="card-title">Quốc gia: ${quocgia.toLocaleString("en")}</h5>
				</div>
				<ul class="list-group list-group-flush">
				<li class="list-group-item">Dân số: ${numberFormat(danso)}</li>
				<li class="list-group-item">Cập nhật:${update.substring(0,10)}</li>
				<li class="list-group-item">Ca nhiễm:${canhiem.toLocaleString("en")}</li>
				<li class="list-group-item">Tử vong: ${tuvong.toLocaleString("en")}</li>
				<li class="list-group-item">Phần trăm:${(Number(tuvong)/Number(canhiem)*100)
					.toLocaleString("en",{minimumFractionDigits:2,maximumFractionDigits:2})+"%"}</li>
					</ul>
					</div>
					</div>`

				}).join("");
			document.querySelector('.info').insertAdjacentHTML("afterend",html);
   		// const id = data.location.id;
   		// const code = data.location.country_code;
   		// const quocgia = data.location.country;
   		// const update = data.location.last_updated;
   		// const danso = data.location.country_population;
   		// const canhiem = data.location.latest.confirmed;
   		// const tuvong = data.location.latest.deaths;
   		// const hoiphuc = data.location.latest.recovered; 

   	}


   	)).catch(error=>console.log('error'));;
}
function get_select_country()
{
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations').then(res=>res.json()).
	then(data=>{
		console.log(data);
		const html =data.locations.map((list) => {
			const country_id = list.id;
			var option = document.querySelector('.option-select');
			if (list.province!="") {
				option.insertAdjacentHTML("afterend",
					`<option value="${country_id}">${list.country}-${list.province}</option>`);
			}
			else {
				option.insertAdjacentHTML("afterend",
					`<option value="${country_id}">${list.country}</option>`);
			}

		});
	});
}