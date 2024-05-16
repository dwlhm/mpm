register_aw9l = [
	[16384, 0.1, 'Phase voltage A'], # 4000
	[16386, 0.1, 'Phase voltage B'], # 4002
	[16388, 0.1, 'Phase voltage C'], # 4004
	[16390, 0.1, 'Wire voltage AB'], # 4006
	[16392, 0.1, 'Wire voltage BC'], # 4008
	[16394, 0.1, 'Wire voltage CA'], # 400a
	[16396, 0.001, 'Phase current A'], # 400c
	[16398, 0.001, 'Phase current B'], # 400e
	[16400, 0.001, 'Phase current C'], # 4010
	[16402, 0.1, 'Active power A'], # 4012 
	[16404, 0.1, 'Active power B'], # 4014 
	[16406, 0.1, 'Active power C'], # 4016 
	[16408, 0.1, 'Total active power'], # 4018 
	[16410, 0.1, 'Reactive power A'], # 401a 
	[16412, 0.1, 'Reactive power B'], # 401c
	[16414, 0.1, 'Reactive power C'], # 401e  
	[16416, 0.1, 'Total reactive power'], # 4020 
	[16418, 0.1, 'Apparent power A'], # 4022
	[16420, 0.1, 'Apparent power B'], # 4024 
	[16422, 0.1, 'Apparent power C'], # 4026 
	[16424, 0.1, 'Total apparent power'], # 4028 
	[16426, 0.001, 'Power factor A'], # 402a 
	[16428, 0.001, 'Power factor B'], # 402c 
	[16430, 0.001, 'Power factor C'], # 402e
	[16432, 0.001, 'Total power factor'], # 4030 
	[16434, 0.01, 'Frequency'], # 4032 
	[16436, 0.001, 'Active power'], # 4034 
	[16438, 0.001, 'Reactive power'], # 4036 
	[16440, 0.001, 'Positive active power'], # 4038 
	[16442, 0.001, 'Negative active power'], # 403a 
	[16444, 0.001, 'Positive reactive power'], # 403c 
	[16446, 0.001, 'Negative reactive power'], # 403e 
	[16454, 0.1, 'Current active power demand'], # 4046 
	[16456, 0.1, 'Maximum active power demand'], # 4048 
	[16458, 0.1, 'Current reactive power demand'], # 404a
	[16460, 0.1, 'Maximum reactive power demand'], # 404c 
	[16466, 0.1, 'A phase voltage total harmonic content'], # 4052 
	[16468, 0.1, 'B phase voltage total harmonic content'], # 4054
	[16470, 0.1, 'C phase voltage total harmonic content'], # 4056 
	[16472, 0.1, 'A phase current total harmonic content'], # 4058 
	[16474, 0.1, 'B phase current total harmonic content'], # 405a 
	[16476, 0.1, 'C phase current total harmonic content'], # 405c 
	[16478, 0.001, '0 phase current'], # 405e 
	[16480, 0.1, 'Phase voltage maximum'], # 4060 
	[16482, 0.1, 'Wires voltage maximum'], # 4062 
	[16484, 0.001, 'Current maximum'], # 4064 
	[16486, 0.1, 'Voltage imbalance'], # 4066 
	[16488, 0.1, 'Current imbalance'], # 4068 
	[16490, 1, 'A, B phase voltage angle'], # 406a 
	[16492, 1, 'B, C phase voltage angle'], # 406c 
	[16494, 1, 'C, A phase voltage angle'], # 406e 
	[16496, 0.001, 'irst quadrant reactive energy'], # 4070 
	[16498, 0.001, 'Second quadrant reactive energy'], # 4072 
	[16500, 0.001, 'Third quadrant reactive energy'], # 4074 
	[16502, 0.001, 'Fourth quadrant reactive power'], # 4076
]

repo = {
    "AW9L": register_aw9l 
}