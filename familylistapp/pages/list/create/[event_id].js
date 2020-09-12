const { default: CreateListView } = require("../../../views/ListView_Create")

const List = props =>{
    return (
        <CreateListView id={props.id}/>
    )
}
List.getInitialProps = ({query})=>{
    return {
        id: query.event_id
    }
}

export default List;