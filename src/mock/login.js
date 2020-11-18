let demoList = {
  access_token: 'eyJhbGciOiJSUzI1NiJ9.eyJkdCI6InBjX3dlYiIsInR0IjoiMSIsInN1YiI6Ijc1ODE0ODI1ODU4ODUyODY0MCIsIlVOb25jZSI6IjM0MDk4YzhjLWY4M2YtNDQ4Zi04YjRjLTZmYjYxYThmOWRmZiwzNjFmYjFjOS0yMmQ3LTQwZDktYTZmZC05MDJiMjM1ZmJiNzciLCJyb2xlIjoiNTg1MDE0NjQyNzE3OTgyNzIwIiwiaXNzIjoieWp5ei5jb20iLCJleHAiOjE2MDU3NzU4MzAsImlhdCI6MTYwNTYwMzAzMCwianRpIjoiMDUyOGNkNjEtNzE1Zi00ZjM3LWFmNDEtZDFiNjMzMGRmOWE2In0.B11p_L0jyxkAdzwHv66JxgabKuWCIU7gm5bpzdx7RnSbZrmYres0e865b-h8lKWUQMavDv7HxUz18NW3PCG_YQfvnfyOoEvYPFcn6zxUVvZCEwKAr54gh9nAj5ZQLpuYfxdH_YX0oSZRIMtZ_n02E9edFm0bS4RwkS5y6Jy08pg',
  expire_in: 172800000,
  refresh_token: 'eyJhbGciOiJSUzI1NiJ9.eyJkdCI6InBjX3dlYiIsInR0IjoiMiIsInN1YiI6Ijc1ODE0ODI1ODU4ODUyODY0MCIsInJvbGUiOiI1ODUwMTQ2NDI3MTc5ODI3MjAiLCJpc3MiOiJ5anl6LmNvbSIsImV4cCI6MTYwNTYwMzAzMCwiaWF0IjoxNjA1NjAzMDMwLCJqdGkiOiI3NzAzN2RkYy0wN2RjLTQxYjEtOGEzMS1mOWQ5NGYwZjA4MjgifQ.KpEgDTTrmphujoNhkh9lF3krXv-rjkjcYlJ0CVm9dloaFojebTJ-sdHcYOF-jGis8OuRo5lbTxcgN-oQS-0Bl1oXuNXG79NasEbQ8A1CBfawCBP2ZYNDX4kUGQkRAmzpQj1-oCIzXPxyg8MqbhGLB6f1VtifRcn8cEoHYhAQwfw',
  scope: 'openid',
  token_type: 'Bearer',
  client_id: null,
  client_secret: null,
  code: '5332e7b85d434dda932656e869320367',
  done: true,
  is_done: true,
  password: null,
  regionCode: null,
  state: 'e268443e43d93dab7ebef303bbe9642f',
  userId: 758148258588528600,
  userIdStr: '758148258588528640',
  username: null
}

export default {
  'post|/login': option => {
    return {
      status: 200,
      message: 'success',
      data: demoList
    }
  }
}
