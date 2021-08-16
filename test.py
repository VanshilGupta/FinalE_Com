
# import math
# import os
# import random
# import re
# import sys
import datetime

# class PacketHandler:
    
#     packets = {}
#     def process_packet(self, seq_num, content):
#         self.packets[seq_num] = content
        
#     def get_current_state(self):
#         print('run')
#         msg = ""
#         seq = sorted(self.packets)
#         i = 0
#         for i in range(len(seq) - 1 ):
#             if seq[i+1] - seq[i] > 10:
#                 return 'ERROR'
#         k = 1
#         while(k<)
#         for k in range(1,len(seq)):
#             print('run2')
#             if k not in seq:
#                 print('k is',k, 'seq is', seq, self.packets)
#                 break
#             else:
#                 print('msg is', msg)
#                 msg+= self.packets[k]
#         return msg
         
# if __name__ == '__main__':

#     packet_handler = PacketHandler()
#     while True:
#         #print(line)
#         line = input()
#         input_str = line.split()
#         seq_num = int(input_str[0])
#         message = input_str[1]

#         packet_handler.process_packet(seq_num, message)
#         print(packet_handler.get_current_state() + "\n")
    
 
a = [1,2,3,4]
for i in range(len(a)):
    a[i] = 5
print(a)

    
    