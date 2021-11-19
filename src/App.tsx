import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import React, { useState } from 'react'
import { useGetWz } from './api/demage-skin'
import * as S from './appStyle'
import Horizontal from './components/Horizontal'
import Vertical from './components/Vertical'

const App: React.FC = () => {
  const [url, setUrl] = useState<string[]>([])
  const wzQuery = useGetWz(url.join('/'))

  const onPrevUrl = () => {
    const newUrl = [...url].slice(0, -1)
    setUrl(newUrl)
  }

  // useEffect(() => {
  //   console.log(wzQuery.data?.children)
  // }, [wzQuery.data])

  const onNextUrl = (newUrl: string) => {
    setUrl([...url, newUrl])
  }

  const renderWz = () => {
    if (!wzQuery.data || !wzQuery.data.value || wzQuery.data.value === '')
      return null

    return (
      <img
        style={{
          display: 'flex',
          width: 'fit-content'
        }}
        src={`data:image/png;base64,${wzQuery.data.value}`}
      />
    )
  }

  if (wzQuery.isLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <Spin size="large" />
          <div>데이터를 불러오고 있습니다.</div>
        </S.LoadingContainer>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <Horizontal>
          <Button disabled={url.length === 0} onClick={onPrevUrl}>
            이전으로
          </Button>
          <Button onClick={() => setUrl([''])}>처음으로</Button>
        </Horizontal>
      </S.Header>
      <S.Body>
        <Vertical gap={8} style={{ alignItems: 'flex-start' }}>
          {wzQuery.data?.children
            .sort((a, b) => {
              return a.localeCompare(b, 'en', { numeric: true })
            })
            .map((item, index) => (
              <Button
                key={index}
                size="small"
                onClick={() => onNextUrl(item)}
                loading={wzQuery.isFetching && url.includes(item)}
              >
                {item}
              </Button>
            ))}
        </Vertical>
        <Vertical style={{ display: 'flex', width: '100%' }}>
          {renderWz()}
        </Vertical>
      </S.Body>
    </S.Container>
  )
}

export default App
