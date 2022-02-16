import { Address } from '@graphprotocol/graph-ts'
import { LogRebase } from '../generated/sRomeERC20/sRomeERC20'
import { RomeERC20 } from '../generated/sRomeERC20/RomeERC20'
import { Rebase } from '../generated/schema'

import {
    ROME_ERC20_CONTRACT,
    STAKING_CONTRACT,
 } from './utils/Constants'
import { toDecimal } from './utils/Decimals'
import { getROMEUSDRate } from './utils/Price'

export function handleLogRebase(event: LogRebase): void {
    let rebaseId = event.transaction.hash.toHex()

    let rebase = Rebase.load(rebaseId)

    if (rebase == null) {
        let epoch = event.params.epoch
        let index = event.params.index
        let romeContract = RomeERC20.bind(Address.fromString(ROME_ERC20_CONTRACT))

        rebase = new Rebase(rebaseId)
        rebase.epoch = epoch
        rebase.stakedRomes = toDecimal(romeContract.balanceOf(Address.fromString(STAKING_CONTRACT)), 9)
        rebase.contract = STAKING_CONTRACT
        rebase.timestamp = event.block.timestamp
        rebase.romePrice = getROMEUSDRate()
        rebase.index = toDecimal(index, 9)
        rebase.save()

    }
}