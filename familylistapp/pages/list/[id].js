const { default: ListView } = require("../../views/ListView")

const List = props =>{
    return (
        <>
        <ListView id={props.id}/>
        </>
    )
}
List.getInitialProps = ({query})=>{
    return {
        id: query.id,
        host:process.env.URL
    }
}

export default List;