import React from "react";
import '../App.css'
import foods from './food.json'

class Home extends React.Component {

    constructor (props) {
        super (props)
        this.state = {
            Food: [],
            Quantity_Food: [],
            Length: 0,
            Display: foods,
            Calories: 0
        }
    }

    addFood = (event) => {
        console.log(event.target.id)
        let id = event.target.id+"Quantity"
        console.log(id)
        let quantity = parseInt(document.getElementById(id).value)
        console.log(quantity)
        // let flag=0
        // let food = []
        // let Quantity = []
        // let ctr=0
        /**for (let i = 0; i< this.state.Length; i++ )
        {
            food[ctr]=this.state.Food[i]
            if(this.state.Food[i]===event.target.id)
                {
                    for(let j=0; j<=ctr; j++)
                    if(this.state.Food[i]===food[j])
                        {
                            Quantity[j]=this.state.Quantity_Food[i]+quantity
                            if(j===i && j===ctr)
                                ctr=ctr+1
                        }
                    flag=1
                }
            else
            {
                Quantity[ctr]=this.state.Quantity_Food[i]
                ctr=ctr+1
            }
        }*/
        let flag=0
        let food = this.state.Food
        let Quantity = this.state.Quantity_Food
        let ctr=this.state.Length
        for(let i=0; i<ctr; i++)
            if(food[i]===event.target.id)
                {
                    Quantity[i] += quantity
                    flag =1
                }

        if (flag===0) {
            food[ctr]=event.target.id
            Quantity[ctr]=quantity
            ctr+=1
        }


        console.log(food)
        console.log(Quantity)
        console.log(ctr+1)
        this.setState ({
            Food: food,
            Quantity_Food: Quantity,
            Length: ctr,
        })

        //return <>{event.target.id}</>
    }

    removeFood = (event) => {
        console.log(event.target.className)
        console.log("Button id" + event.target)
        let food = []
        let Quantity = []
        let ctr=0
        for(let i=0; i<this.state.Length; i++)
            if(this.state.Food[i]===event.target.id)
                continue
            else
                {
                    food[ctr]=this.state.Food[i]
                    Quantity[ctr]=this.state.Quantity_Food[i]
                    ctr=ctr+1
                }
        console.log(food)
        console.log(Quantity)
        console.log(ctr+1)
        this.setState ({
            Food: food,
            Quantity_Food: Quantity,
            Length: ctr,
        })
    }
    
    update_list =() => {
        let search = document.getElementById('search')
        let search_foods=[]
        //console.log("value "+search.innerText.length)
        // if(search.value!=null)
        //     console.log(search)
        if (search!=null)
        {
            search_foods=foods.filter(items => (items.name.toUpperCase()).indexOf(search.value.toUpperCase())>=0)
            //search_foods = search_foods.length===0?foods:search_foods
        }
        else
            search_foods=foods
        //search_foods = search_foods.length===0?"No matching foods found":search_foods
        console.log(search_foods)
        // let list = search_foods.map(element => (
        //     <div>
        //         <img className = "food_image" src={element.image} alt={element.name}/>
        //         <div>
        //             <div>{element.name}</div>
        //             <div>{element.calories}</div>
        //         </div>
        //         <div>
        //             <input type="number" className="Quantity" id={element.name+"Quantity"} />
        //             <button className="Add_Food_Today" id={element.name} onClick={this.addFood}>+</button>
        //         </div>
        //     </div>
        // ));
        //console.log("Hi!" + list.length)
        this.setState({Display:search_foods})
        //return list
    }

    display_foods =()=>{
        console.log("Display foods called")
        if (this.state.Display.length===0)
            return <div>No matching food found</div>
        let list = this.state.Display.map(element => (
            <div className="display_Foods">
                <img className = "food_image" src={element.image} alt={element.name}/>
                <div className="name_calories">
                    <div className="name">{element.name}</div>
                    <div>{element.calories}</div>
                </div>
                <div className="number_button">
                    <input type="number" placeholder={"Enter Quantity of "+element.name} className="Quantity" id={element.name+"Quantity"} />
                    <button className="Add_Food_Today" id={element.name} onClick={this.addFood}>+</button>
                </div>
            </div>
        ));
        return list
    }

    display_today_list = () =>{
        console.log("display_today_list called")
        let List = []
        let calories=0
        for (let i=0 ;i<this.state.Length; i++)
        {
            let cal = foods.filter(items => items.name===this.state.Food[i])
            console.log(cal[0].calories)
            calories = calories + cal[0].calories*this.state.Quantity_Food[i]
            //this.setState({Calories: this.state.Calories+cal[0].calories*this.state.Quantity_Food[i]})
            List[i] = <div className="display_today_food_list">
                <span>{this.state.Quantity_Food[i]}</span>
                <span> {this.state.Food[i]}</span>
                <span> = {cal[0].calories*this.state.Quantity_Food[i]}</span>
                <button className="ButtonClose" onClick={this.removeFood}><span><i id={this.state.Food[i]} class="bi bi-x-lg"></i></span></button>
            </div>
        }
        console.log(List)
        return <>
            <h4>Today's Food {calories} cal</h4>
            <div>
                {List}
            </div>
        </>
    }

    render () {
        console.log("render called")
        return <>

            <div className="all_div">
                <div>
                    <h4>Search</h4>
                    <input type="text" placeholder="Search 7+ products" className="search" id="search" onChange={this.update_list}/>
                    {this.display_foods()}
                </div>
                <div>
                    {this.display_today_list()}
                </div>
            </div>
        
        </>
    }

}

export default Home