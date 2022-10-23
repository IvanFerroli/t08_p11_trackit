import { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";

import { Wrapper, Container, Weekday, Name } from "./styled/HabitStyled";
import UserContext from "../../contexts/UserContext";
import HabitsContext from "../../contexts/HabitsContext";
import axios from "axios";

function Habit(props) {
	const { name, days, id } = props;
	const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
	const { habits, setHabits } = useContext(HabitsContext);
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	function deleteHabit() {
		const URL = `
        https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}
        `;
		const promise = axios.delete(URL, config);
		promise.then((response) => {
			console.log(response);
			const filteredHabits = habits.filter((habit) => habit.id !== id);
			setHabits(filteredHabits);
		});
		promise.catch((err) => {
			console.log(err.response);
		});
	}

	function showHabit() {
		return (
			<Wrapper>
				<Container>
					<Name>
						<p>{name}</p>
						<span
							onClick={() => {
								Swal.fire({
									title: "Deseja deletar este hábito?",
									text: "Não será possível reverter esta ação!",
									icon: "warning",
									showCancelButton: true,
									confirmButtonColor: "#3085d6",
									cancelButtonColor: "#d33",
									confirmButtonText: "Sim",
									cancelButtonText: "Não",
								}).then((result) => {
									if (result.isConfirmed) {
										deleteHabit();
										setHabits();
									}
								});
							}}
						>
							<BsFillTrashFill />
						</span>
					</Name>
					<div>
						{weekdays.map((weekday, index) => {
							return (
								<Weekday key={index} i={index} days={days}>
									{weekday}
								</Weekday>
							);
						})}
					</div>
				</Container>
			</Wrapper>
		);
	}

	return <>{showHabit()}</>;
}

export default Habit;
