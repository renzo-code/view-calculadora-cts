import React, {useState, useEffect} from 'react'
import Layout from './layout/index'
import styled from 'styled-components'
import moment from 'moment'

import LineDate from './components/LineDate'
import FamComboBox from './components/FamComboBox'

const App = () => {
  const [fecha, setFecha] = useState(null)
  const [sueldo, setSueldo] = useState(null)
  const [diffMeses, setDiffMeses] = useState(null)
  const [valueBonoFam, setValueBonoFam] = useState(102.5)
  const [resultSB , setResultSB] = useState(null)
  const [bono, setBono] = useState(null)
  const [fam, setFam] = useState(null)
  const [remuComputable, setRemuComputable] = useState(null)
  const [diffGrati, setDiffGrati] = useState(null)
  const [ctsFinally, setCtsFinally] = useState(null)

  const optionsFam = [
    {
      id : 1,
      description : "Sí"
    },
    {
      id: 2,
      description : "No"
    }
  ]

  const handleInput = (e) => {
    const { value, validity: { valid } } = e.target;
    setSueldo(valid ? value : sueldo)
  }

  const handleComboFam = (e) => {
    let  value = e.target.value
    setFam(value)
  }
  
  const hendleFechaIngreso = (e) => {
    let formatDate = moment(e.target.value)
    setFecha(formatDate)
  }

  useEffect (() => {
    setDiffMeses(moment("2022-11-01").diff(fecha, "month"))

    if(diffMeses <= 6){
      
      console.log("diffMeses", diffMeses)

      if(fam === "1"){
        setDiffGrati(moment("2022-12-01").diff(fecha, "month"))
        if (diffGrati <= 6) {
          console.log("diffGrati", diffGrati)
          setRemuComputable(((parseInt(sueldo) + valueBonoFam) / 6 * diffGrati) / 6)
          console.log("remuComputable", remuComputable)

          setCtsFinally((parseInt(sueldo) + valueBonoFam + remuComputable) / 12 * diffMeses)
          console.log("setCtsFinally", ctsFinally)
        }

        if(diffGrati >= 6){
          setRemuComputable(((parseInt(sueldo) + valueBonoFam) / 6 * 6) / 6)
          console.log("remuCompubale2", remuComputable)

          setCtsFinally((parseInt(sueldo) + valueBonoFam + remuComputable) / 12 * 6)
          console.log("setCtsFinally2", ctsFinally)
        }

      }

      if(fam === "2"){
        setDiffGrati(moment("2022-12-01").diff(fecha, "month"))
        if (diffGrati <= 6) {
          console.log("diffGrati", diffGrati)
          setRemuComputable((parseInt(sueldo) / 6 * diffGrati) / 6)
          console.log("remuComputable", remuComputable)

          setCtsFinally((parseInt(sueldo) + remuComputable) / 12 * diffMeses)
          console.log("setCtsFinally", ctsFinally)
        }
        else{
          setRemuComputable((parseInt(sueldo) / 6 * 6) / 6)
          console.log("remuCompubale2", remuComputable)

          setCtsFinally((parseInt(sueldo) + remuComputable) / 12 * 6)
          console.log("setCtsFinally", ctsFinally)
        }
      }

      
    } else{

      if(fam === "1"){
        setDiffGrati(moment("2022-12-01").diff(fecha, "month"))
        if (diffGrati <= 6) {
          console.log("diffGrati", diffGrati)
          setRemuComputable(((parseInt(sueldo) + valueBonoFam) / 6 * diffGrati) / 6)
          console.log("remuComputable", remuComputable)

          setCtsFinally((parseInt(sueldo) + valueBonoFam + remuComputable) / 12 * 6)
          console.log("setCtsFinally", ctsFinally)
        }

        if(diffGrati >= 6){
          setRemuComputable(((parseInt(sueldo) + valueBonoFam) / 6 * 6) / 6)
          console.log("remuCompubale2", remuComputable)

          setCtsFinally((parseInt(sueldo) + valueBonoFam + remuComputable) / 12 * 6)
          console.log("setCtsFinally2", ctsFinally)
        }

      }

      if(fam === "2"){
        setDiffGrati(moment("2022-12-01").diff(fecha, "month"))
        if (diffGrati <= 6) {
          console.log("diffGrati", diffGrati)
          setRemuComputable((parseInt(sueldo) / 6 * diffGrati) / 6)
          console.log("remuComputable", remuComputable)

          setCtsFinally((parseInt(sueldo) + remuComputable) / 12 * 6)
          console.log("setCtsFinally", ctsFinally)
        }
        else{
          setRemuComputable((parseInt(sueldo) / 6 * 6) / 6)
          console.log("remuCompubale2", remuComputable)

          setCtsFinally((parseInt(sueldo) + remuComputable) / 12 * 6)
          console.log("setCtsFinally", ctsFinally)
        }
      }
    }
  }, [fecha, sueldo, diffMeses, bono, resultSB, fam, diffGrati, valueBonoFam, remuComputable, ctsFinally])


  return(
    <Layout>
      <ContainerTitle>
        <Title>
          CALCULADORA DE LA CTS
        </Title>
      </ContainerTitle>
      <ContainerBody>
        <LineDate
          type="date"
          title="Fecha de Ingreso"
          onChange={(e) => hendleFechaIngreso(e)}
        />
        <LineDate
          type="text"
          title="Sueldo Bruto"
          placeholder="S/. 0.00"
          name="SueldoBruto"
          value={sueldo}
          onInput={(e) => handleInput(e)}
          pattern="[0-9]*"
        />
        <LineDate
          type="number"
          title="Tiempo laboral computable (meses)"
          disabled="true"
          value={diffMeses > 6 ? 6 : diffMeses}
        />
        <FamComboBox
          options={optionsFam}
          placeholder="Selecciona uno"
          title="Con hijo(s) (Bonificación familiar)"
          onChange={(e) => handleComboFam(e)}
        />
        <Line/>
        <LineDate
          type="number"
          title="Total a recibir"
          disabled="true"
          value={ctsFinally > 0 ? ctsFinally?.toFixed(2) : ctsFinally?.toFixed(2)}
        />
        <Footer/>
      </ContainerBody>
    </Layout>
  )
}

export default App


const ContainerTitle = styled.div`
  width: 100%;
  background-color: #923635;
  height: 50px;
  line-height: 50px;
  margin: 50px auto 20px;

  @media (max-width: 520px){
    margin: 0 auto 15px;
  }
`
const Title = styled.h3`
  font-family: Roboto-Bold;
  font-size: 25px;
  text-align: center;
  color: white;
  height: auto;

  @media (max-width: 600px){
    font-size: 22px;
  }
  @media (max-width: 520px){
    font-size: 18px;
  }
  @media (max-width: 420px){
    font-size: 15px;
  }
`
const ContainerBody = styled.div`
  /* background-color: blue; */
  background-image: url("./images/dolares.png");
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  height: 100%;
  width: 100%;
`
const Line = styled.div`
  height: 3px;
  background-color: #9A9A9A;
  width: 90%;
  margin: 15px auto 20px;
  
  @media (max-width: 560px){
    width: 100%;
  }
`
const Footer = styled.div`
  margin-top: 30px;
  background-color: #4D4D4D;
  height: 45px;
  width: 100%;
  background-image: url("https://cdn.larepublica.pe/images/content/default/logo-lr.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 160px;
  object-fit: cover;

  @media (max-width: 520px){
    background-size: 120px;
    margin-top: 20px;
  }
`