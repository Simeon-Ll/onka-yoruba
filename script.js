let $id = (id) => document.getElementById(id)
const digits = ['odo', 'okan', 'méjì', 'mẹ́ta', 'mẹ́rin', 'márùn-ún', 'mẹ́fà', 'méje', 'mẹ́jọ', 'mẹ́sán-án', 'mẹ́wàá','mọ̀kànlá','méjìlá', 'mẹ́tàlá', 'mẹ́rìnlá']
const tens = ['odo','mẹ́wàá','ogún', 'ọgbọ̀n', 'ogójì', 'àádọ́ta', 'ọgọ́ta', 'àádọ́rin', 'ọgọ́rin', 'àádọ̀rún', 'ọgọ́rùn-ún', 'àádọ́fà', 'ọgọ́fà', 'àádóje', 'ogóje', 'àádọ́jọ', 'ọgọ́jọ', 'àádọ́sàn-án', 'ọgọ́sàn-án', 'àádọ́wàá', 'igba']
const hundreds = ['odo', 'ọgọ́rùn-ún', 'igba', 'ọ́ọ̀dúnrún', 'irinwó', 'ẹ̀ẹ́dẹ́gbẹ̀ta', 'ẹgbẹ̀ta', 'ẹ̀ẹ́dẹ̀gbẹ̀rin', 'ẹgbẹ̀rin', 'ẹ̀ẹ́dẹ́gbàárun', 'ẹ̀gbẹ̀rún']
const suffixHundreds = ['odo', 'lọgọ́rùn-ún', 'rugba', 'lọ́ọ̀dúnrún', 'nirinwó', 'lẹ̀ẹ́dẹ́gbẹ̀ta', 'lẹgbẹ̀ta', 'lẹ̀ẹ́dẹ̀gbẹ̀rin', 'lẹgbẹ̀rin', 'lẹ̀ẹ́dẹ́gbàárun', 'lẹ̀gbẹ̀rún']
const evenTens = ['okòó', 'òjì', 'ọ̀tà', 'ọ̀rìn']


$id('enter').addEventListener('click', logic)


let state = true

function logic() {
    let input = $id('input').value

    if(input == ''){
        alert('Enter a number')
        state = false
    }
    else if (input > 1000) {
        alert('Number greater than 100')
        $id('input').value = ''
        state = false
    }else{
        state = true
    }

    

    if (state) {

        let result

        if (input < 15) {
            result = digits[input]
        }
        
        
        else if (input > 15 && input < 200) {
            if (input % 10 == 0) {
                result = tens[input / 10]
            }
            let count = 0
            let threshold
            let gate = false
            for (threshold = 15; gate == false; threshold += 10) {
                
                
                if (threshold > input) {
                    gate = true
                }
                
                else{
                    gate = false
                    
                }
                count++
                
            }
            threshold -= 15

            let unit = Math.abs(input-threshold)

            let phrase
            if (input > threshold) {
                phrase = 'lé'
            }else{
                phrase = 'dín'
            }

            if (input > 194) {
                result = tens[count] + '-o-' + phrase + '-' +digits[unit]
            }else{
                result = digits[unit] + '-' + phrase + '-l' + tens[count]
            }

            
            
        }else if (input >= 200) {
            
            let num = input % 100
            let hundred = hundreds[(input - num) / 100]
            let suffixHundred = suffixHundreds[(input - num) / 100]
            console.log(num, hundred, input);


            if(num == 0){
                result = hundred
            }
            else if (num < 10) {
                result = hundred + '-o-lé-' + digits[num]
            }  
            else if (num >= 90) {
                result = hundreds[((input - num) / 100) + 1] + '-o-dín-' + digits[10 - (num%10)]
            }
            else if (num % 20 == 0) {
                result = evenTens[num / 20 - 1] + '-lé-' + suffixHundred
            }else if (num % 20 == 10) {
                result = evenTens[(num+10)/20 - 1] + '-lé-' + suffixHundred + '-o-dín-mẹ́wàá'
            }
            else{
                let count = 0
                let threshold
                let gate = false
                for (threshold = 20; gate == false; threshold += 20) {

                    if (threshold > num) {
                        gate = true
                        threshold -= 20
                    }else{
                        gate = false
                    }
                    count++
                    console.log(threshold, num, count)
                }

                console.log(threshold, num)
                threshold -= 10
                count--
                console.log(threshold, num)
                let phrase 
                
                if (num > threshold) {
                    phrase = 'dín'
                    threshold += 10
                }else{
                    threshold -= 10
                    phrase = 'lé'
                    console.log(threshold, num)
                }
                let unit = Math.abs(num - threshold)
                

                result = evenTens[threshold/20 - 1] +'-lé-'+ suffixHundred +  '-o-' + phrase +'-'+ digits[unit]
            }
            
            

            
        }
       $id('result').innerHTML = result
    }
    
}

