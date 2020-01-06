import React from 'react'
import styles from './ItemBox.module.scss';

const ItemBox = props  => {
    return (
    <> 
    {props.list.map((item) => {
        return(
            <div className={styles.personBox} key={item.name}>
                <h2>{ item.name }</h2>
                <div className={styles.gridBox}>
                    <p><span>Birth Yaers:</span> { item.birth_year }</p>
                    <p><span>Mass:</span> { item.mass }</p>
                    <p><span>Height:</span> { item.height }</p>
                    <p><span>Gender:</span> { item.gender }</p>
                </div>
            </div>
        )
    })}
    </>
    )
}

export default ItemBox