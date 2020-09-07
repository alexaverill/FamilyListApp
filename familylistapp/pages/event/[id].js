const Event = props =>{
    return (
        <>
        <h1>{props.id}</h1>
        </>
    )
}
Event.getInitialProps = ({query})=>{
    return {
        id: query.id
    }
}

export default Event;