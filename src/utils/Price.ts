import { Address, BigDecimal, log } from '@graphprotocol/graph-ts'
import { SolarPair } from '../../generated/sRomeERC20/SolarPair';

import { SOLAR_ROMEFRAX_PAIR } from './Constants'


let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')

export function getROMEUSDRate(): BigDecimal {
    let pair = SolarPair.bind(Address.fromString(SOLAR_ROMEFRAX_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    if (reserve0 == BigDecimal.fromString('0') || reserve1 == BigDecimal.fromString('0')) {
        log.warning(
            "0 value found from ROMEFRAX pair contract, reserve0 == {}, reserve1 == {}",
            [reserve0.toString(), reserve1.toString()]
        )
        return BigDecimal.fromString("0")
    }

    let romeRate = reserve0.div(reserve1).div(BIG_DECIMAL_1E9)
    log.debug("ROME rate {}", [romeRate.toString()])

    return romeRate
}