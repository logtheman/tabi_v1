
export function getDate(){
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!

	const yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 

	const date = `${yyyy}-${mm}-${dd}`;
	console.log(date);

	return date;
}


