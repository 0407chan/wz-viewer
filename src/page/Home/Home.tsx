import { useGetWz } from '@/api/demage-skin'
import Horizontal from '@/components/Horizontal'
import Vertical from '@/components/Vertical'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './style'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [url, setUrl] = useState<string[]>([])
  const wzQuery = useGetWz(url.filter((item) => item !== 'wz-viewer').join('/'))

  const onPrevUrl = () => {
    const newUrl = [...url].slice(0, -1)
    navigate(newUrl.join('/'))
  }
  const onHomeUrl = () => {
    navigate('')
  }
  const onNextUrl = (newUrl: string) => {
    navigate([...url, newUrl].join('/'))
  }

  useEffect(() => {
    const newUrl = window.location.pathname
      .split('/')
      .filter((item) => item !== '')
    setUrl(newUrl)
  }, [window.location.pathname])

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
          <Button
            disabled={url.filter((item) => item !== 'wz-viewer').length === 0}
            onClick={onPrevUrl}
          >
            이전으로
          </Button>
          <Button onClick={onHomeUrl}>처음으로</Button>
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

export default Home
