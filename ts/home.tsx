import * as React from "react";
import { useLocation, useParams } from "react-router-dom";

interface State {
  count:number
}
interface Props {
  id:any
  location:any
}

const Home = () => {
  let {id } = useParams()
  let location = useLocation()
  return <HomeClass id={id} location={location}/>
}

 class HomeClass extends React.Component <Props,State>{
    constructor(props:Props){
      super(props);
        this.state = {count:1}
        console.log(location)
    }
    componentDidUpdate() {
      console.log("ss")
    }
  render() {
    return (
      <div>
        Home v3 {this.state.count}
        <button className="text-blueAhmed text-4xl" onClick={() => this.setState({count:this.state.count+1})}> click here</button>
      </div>
    )
  }
}

export default Home