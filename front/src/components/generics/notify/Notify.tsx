export function NotificationError(props: {title: string, msg ?: string}){
    return <span>
            <b>{props.title}</b>
            {props.msg && <p>{props.msg}</p>}
        </span>
}