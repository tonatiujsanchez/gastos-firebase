import styled from "styled-components"
import formatoMoneda from "../helpers/formatoMoneda"
import theme from "../theme"
import useAuth from './../hooks/useAuth'


const BarraTotalGastado = () => {

	const { usuario } = useAuth()

	return (
		<BarraTotal>
			{/* <p>Total de Gastos</p> */}
			<p>{usuario.email}</p>
			<p>{formatoMoneda(0)}</p>
		</BarraTotal>
	)
}

const BarraTotal = styled.div`
	background: ${theme.verde};
	font-size: 1.25rem; /* 20px */
	letter-spacing: 1px;
	font-weight: 500;
	text-transform: uppercase;
	padding: 0.62rem 2.25rem; /* 10px 40px */
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media(max-width: 31.25rem) { /* 500px */
		flex-direction: column;
		font-size: 14px;
	}
`;

export default BarraTotalGastado