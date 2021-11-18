import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'
import Radio from 'antd/lib/radio'
import React, { useEffect, useState } from 'react'
import { UseQueryResult } from 'react-query'
import {
  useGetDemageSkin,
  useGetDemageSkinAll,
  useGetWzImage
} from './api/demage-skin'
import * as S from './appStyle'
import Horizontal from './components/Horizontal'
import { GetDemageSkinResponse, SkinType } from './type/demage-skin'

const skinTypeOptions = [
  { label: '일반0', value: 'NoRed0' },
  { label: '일반1', value: 'NoRed1' },
  { label: '크리티컬0', value: 'NoCri0' },
  { label: '크리티컬1', value: 'NoCri1' },
  { label: '뭐야', value: 'NoRed3' }
]
const App: React.FC = () => {
  const [skinId, setSkinId] = useState<number>(200)
  const [skinType, setSkinType] = useState<SkinType>('NoCri1')

  const demageAll = useGetDemageSkinAll({ skinId, skinType })
  const demage0 = useGetDemageSkin({ skinId, skinType, skinNumber: '0' })
  const demage1 = useGetDemageSkin({ skinId, skinType, skinNumber: '1' })
  const demage2 = useGetDemageSkin({ skinId, skinType, skinNumber: '2' })
  const demage3 = useGetDemageSkin({ skinId, skinType, skinNumber: '3' })
  const demage4 = useGetDemageSkin({ skinId, skinType, skinNumber: '4' })
  const demage5 = useGetDemageSkin({ skinId, skinType, skinNumber: '5' })
  const demage6 = useGetDemageSkin({ skinId, skinType, skinNumber: '6' })
  const demage7 = useGetDemageSkin({ skinId, skinType, skinNumber: '7' })
  const demage8 = useGetDemageSkin({ skinId, skinType, skinNumber: '8' })
  const demage9 = useGetDemageSkin({ skinId, skinType, skinNumber: '9' })
  const criEffect = useGetDemageSkin({
    skinId,
    skinType,
    skinNumber: 'Effect3'
  })
  const numberSpace = useGetDemageSkin({
    skinId,
    skinType,
    skinNumber: 'numberSpace'
  })
  const counter = useGetDemageSkin({ skinId, skinType, skinNumber: 'counter' })
  const guard = useGetDemageSkin({ skinId, skinType, skinNumber: 'guard' })
  const Miss = useGetDemageSkin({ skinId, skinType, skinNumber: 'Miss' })
  const resist = useGetDemageSkin({ skinId, skinType, skinNumber: 'resist' })
  const shot = useGetDemageSkin({ skinId, skinType, skinNumber: 'shot' })
  const star = useGetWzImage()
  useEffect(() => {
    console.log(demageAll.data?.children)
  }, [demageAll.data])

  const renderDemage = (
    demageQuery: UseQueryResult<GetDemageSkinResponse, unknown>
  ) => {
    if (
      !demageQuery.data ||
      !demageQuery.data.value ||
      demageQuery.data.value === ''
    )
      return null

    return (
      <img
        style={{
          display: 'flex',
          width: 'fit-content',
          marginLeft:
            numberSpace.data?.value !== undefined &&
            Number(numberSpace.data?.value) < 0
              ? Number(numberSpace.data?.value)
              : undefined
        }}
        src={`data:image/png;base64,${demageQuery.data.value}`}
      />
    )
  }
  return (
    <S.Container>
      {/* <S.Header>
      </S.Header> */}
      <Horizontal style={{ margin: '60px 0', justifyContent: 'center' }}>
        <Button disabled={skinId === 1} onClick={() => setSkinId(skinId - 1)}>
          -
        </Button>
        <S.Text>{skinId}</S.Text>
        <InputNumber value={skinId} onChange={(value) => setSkinId(value)} />
        <Button onClick={() => setSkinId(skinId + 1)}>+</Button>
      </Horizontal>
      <Horizontal style={{ justifyContent: 'center' }}>
        <Radio.Group
          options={skinTypeOptions}
          value={skinType}
          buttonStyle="solid"
          onChange={(event) => setSkinType(event.target.value)}
        />
      </Horizontal>
      <S.Body>
        <Horizontal
          gap={
            numberSpace.data?.value !== undefined &&
            Number(numberSpace.data?.value) > 0
              ? Number(numberSpace.data?.value)
              : 0
          }
          style={{ justifyContent: 'center' }}
        >
          {renderDemage(criEffect)}
          {renderDemage(demage0)}
          {renderDemage(demage1)}
          {renderDemage(demage2)}
          {renderDemage(demage3)}
          {renderDemage(demage4)}
          {renderDemage(demage5)}
          {renderDemage(demage6)}
          {renderDemage(demage7)}
          {renderDemage(demage8)}
          {renderDemage(demage9)}
        </Horizontal>
        <Horizontal style={{ justifyContent: 'center' }}>
          {renderDemage(counter)}
          {renderDemage(guard)}
          {renderDemage(Miss)}
          {renderDemage(resist)}
          {renderDemage(shot)}
        </Horizontal>
      </S.Body>
    </S.Container>
  )
}

export default App