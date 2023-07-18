import { Button, TextInput } from 'flowbite-react';
import { useRef } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';


export default function PostalCode( { isSteps, setIsSteps, request, court, setCourt, adress, setAdress, website, setWebsite} ) {

  const postalCode = useRef(null);
  var dataOutput;

async function handleCall (ms) {
  return new Promise ((resolve) => {
    //const prompt = "Was ist das richtige Gericht für "+`${request[0]}`+", spezifisch das Thema "+`${request[1]}`+" in Deutschland spezfisich im Ort mit der Postleitzahl "+`${request[2]}`+"? Antworte nur mit dem Namen des Gerichts, der Adresse des Gerichts und der Website. Übermittle die Daten im JSON Format.";
    console.log(prompt)
    const systemMessage = { "role": "system", "content": "Du bist ein API-Endpunkt zum identifizieren des richtigen Gerichts in Deutschland für einen bestimmten Rechtsfall. Übermittle den Namen des Gericht, die Adresse des Gerichts und die Website des Gerichts im JSON Format. Nutze folgendes Format: Name: XXX, Adresse: XXX, Website: XXX" }
    console.log(systemMessage)
    const message = { "role": "assistant", "content": "Was ist das richtige Gericht für "+`${request[0]}`+", spezifisch das Thema "+`${request[1]}`+" in Deutschland spezifisch im Ort mit der Postleitzahl "+`${request[2]}`+"?" }
    console.log(message)
    const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        message
      ],
      "temperature": 0
    })
  };
  fetch('https://api.openai.com/v1/chat/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
      dataOutput = data;
      console.log(dataOutput);
      setTimeout(resolve, ms);
    }).catch(err => {
      console.log("Error! Try again.");
      setTimeout(resolve, ms);
    });
  });
  }

  async function saveData (ms) {
    return new Promise ((resolve) => {
      const json = JSON.parse(JSON.stringify(JSON.parse(dataOutput.choices[0].message.content)))
      console.log(json)
      setCourt(court => json["Name"]);
      setAdress(adress => json["Adresse"]);
      setWebsite(website => json["Website"]);
      setTimeout(resolve, ms);
    })
  }
    

async function SubmitPostal (e) {
    e.preventDefault();
    request[2]=postalCode.current.value
    setIsSteps(isSteps=4)
    await (handleCall(1000));
    await (saveData(1000));
    setIsSteps(isSteps=5)
}

  return (
    <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <form onSubmit={SubmitPostal}>
        <div className="text-center">
                <h1 className="font-akkurat text-legalnavverydarkpurple text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                What is the postal code of the property?
                </h1>
                </div>
      <div>
        <div className="mx-auto max-w-sm py-10">
        <TextInput
          id="postalCode1"
          name="Postal Code"
          ref={postalCode}
          placeholder="Postal Code"
          required
          type="number"
        />
      </div>
      </div>
      <div className="flex items-center justify-center">
      <Button 
        type="submit"
        className="font-akkurat text-[#ffffff] bg-legalnavverydarkpurple hover:-translate hover:scale-110 hover:bg-legalnavdarkpurple duration-300 focus:outline-none border-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 shadow-2xl mr-3"
      >
        Submit
      </Button>
      </div>
      <div className='back-button py-6 pr-2 flex items-center justify-center '>
                    <Button onClick={() => {setIsSteps(2)}} className='hover:-translate hover:scale-110 duration-300'>
                        <HiOutlineArrowLeft className="ml-0 h-4 w-4" />
                        <p>
                        &nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;
                        </p>                        
                    </Button>
                    </div>
    </form>
    </div>
  )
}