import EventView from "../../views/EventView"
const Event = props =>{
    return (
        
        <EditEvent id={props.id}/>

    )
}
Event.getInitialProps = ({query})=>{
    return {
        id: query.id,
    }
}

export default Event;