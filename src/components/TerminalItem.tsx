import React, {useState} from 'react'
import ConfirmDrawer from './ConfirmDrawer'

interface Props {
    title: string
    content: string
    onClick: (title: string) => void
    onRun: (title: string) => void
    onDelete: (title: string) => void
}

function TerminalItem(props: Props) {

    // Click and Press
    const [touchTimeOut, setTouchTimeOut] = useState(setTimeout(()=>{},0))
    const [isClick, setIsClick] = useState(true)

    function handleTouchStart() {
        clearTimeout(touchTimeOut)
        setTouchTimeOut(setTimeout(() => {
            setIsClick(false)

            // Long Press
            setIsDelete(!isDelete)
        }, 500))
    }

    function handleTouchEnd() {
        clearTimeout(touchTimeOut)
        if (isClick) {
            // Click
            props.onClick(props.title)
        } else {
            setIsClick(true)
        }
    }

    function handleTouchMove() {
        clearTimeout(touchTimeOut)
        setIsClick(false)
    }

    // Run or Delete

    const [isDelete, setIsDelete] = useState(false)

    function handleRun(e: React.TouchEvent<HTMLAnchorElement>|React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation()
        props.onRun(props.title)
    }
    function handleDelete(e: React.TouchEvent<HTMLAnchorElement>|React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation()
        setIsDrawerDisplay(true)
    }

    const [isDrawerDisplay, setIsDrawerDisplay] = useState(false)

    return (
        <div className='terminal-item'  onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd}>
            <div className='terminal-text'>
                <div className='terminal-text-title'>{props.title}</div>
                <div className='terminal-text-content'>{props.content}</div>
            </div>
            <div className='terminal-buttoncontainer'>
                {isDelete ? <a onTouchEnd={handleDelete} onMouseUp={handleDelete} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} className='terminal-button' href='/#'>Delete</a>
                :<a onTouchEnd={handleRun} onMouseUp={handleRun} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} className='terminal-button' href='/#'>Run</a>}
                
            </div>
            <div onMouseUp={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                <ConfirmDrawer isDisplay={isDrawerDisplay} onConfirm={() => {setIsDrawerDisplay(false); props.onDelete(props.title)}} onCancle={() => setIsDrawerDisplay(false)}>Are you sure to delete the item?</ConfirmDrawer>
            </div>
        </div>
    )
}

export default TerminalItem