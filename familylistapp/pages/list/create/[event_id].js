const { default: CreateListView } = require("../../../views/ListView_Create")

const List = props =>{
    return (
        <CreateListView id={props.id} host={props.host}/>
    )
}
List.getInitialProps = ({query})=>{
    return {
        id: query.event_id,
        host:process.env.URL
    }
}

export default List;