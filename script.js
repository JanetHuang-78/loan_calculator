const calculate = document.querySelector('input.calbtn')
const form = document.querySelector('form')
const UIamount = document.querySelector('.money')
const cleanbtn = document.querySelector('.clearbtn')

form.addEventListener('submit', function(e){
    
    //when click, open loading
    const page = document.querySelector('.result-page');
    const loading = document.querySelector('.loading');
    page.style.display = 'none';
    loading.style.display = 'flex';

    //calculate after 2 seconds
    setTimeout(calculatePayment, 2000);

    e.preventDefault();
})

function calculatePayment(e){
    
    const loading = document.querySelector('.loading');
    loading.style.display = 'none'
    
    const UIinterest = document.querySelector('.interest')
    const UIyears = document.querySelector('.yearText')

    const MonthlyPayment = document.querySelector('input.resultMonthlypayment')
    const TotalPayment = document.querySelector('input.resultTotalpayment')
    const InterestRate = document.querySelector('input.resultInterestRate')
    
    const principle = parseFloat(UIamount.value);
    calculatedPayments = parseFloat(UIyears.value) * 12;
    calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;

    //Monthly Payment
    const x = Math.pow(1+ calculatedInterest, calculatedPayments)
    const monthly = (principle * x * calculatedInterest)/(x-1)
    

    if(isFinite(monthly)){
        MonthlyPayment.value = monthly.toFixed(2);
        TotalPayment.value = (monthly* calculatedPayments).toFixed(2);
        InterestRate.value = ((monthly * calculatedPayments) - principle).toFixed(2)
    
        const page = document.querySelector('.result-page')
        page.style.display = 'block';
    }else{
        const loading = document.querySelector('.loading');
        loading.style.display = 'flex';
        setTimeout(AddError('Please Check Your Numbers'), 2000);
        
    }
    e.preventDefault();
}


//Add error message

function AddError(error){
    const loading = document.querySelector('.loading');
    loading.style.display = 'none';

    //Do nothing if an error exists
    if (document.querySelector('.errorMsg') === null){
        //Append the error Msg
        const errMsg = document.createTextNode(error);
        const newdiv = document.createElement('div');
        newdiv.className = 'errorMsg';
        newdiv.style.backgroundColor = 'pink';
        newdiv.style.textAlign = 'center';
        newdiv.style.padding = '10px';
        newdiv.style.fontSize = '18px';
        newdiv.style. borderRadius = '5px';
        newdiv.appendChild(errMsg)
        const div = document.querySelector('.input-data')
        const h1 = document.querySelector('h1')
        div.insertBefore(newdiv, h1)


        //Remove Error after 3 seconds
        setTimeout(clearError, 3000)
    }

}

function clearError(){
    const errorMsg = document.querySelector('.errorMsg')
    errorMsg.remove();
}

cleanbtn.addEventListener('click',cleanData)

function cleanData(e){
    
    const UIamount = document.querySelector('.money');
    const UIinterest = document.querySelector('.interest');
    const UIyears = document.querySelector('.yearText');

    UIamount.value = '';
    UIinterest.value = '';
    UIyears.value = '';
    
    const page = document.querySelector('.result-page');
    page.style.display = 'none'

    e.preventDefault()
}