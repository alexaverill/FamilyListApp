const List = props =>{
    return (
        <>
        <h1>{props.id}</h1>
        </>
    )
}
List.getInitialProps = ({query})=>{
    return {
        id: query.id
    }
}

export default List;