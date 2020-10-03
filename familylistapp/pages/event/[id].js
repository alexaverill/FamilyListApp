import EventView from "../../views/EventView"
const Event = props =>{
    return (
        
        <EventView id={props.id} host={props.host}/>

    )
}
Event.getInitialProps = ({query})=>{
    return {
        id: query.id,
        host:process.env.URL
    }
}

export default Event;