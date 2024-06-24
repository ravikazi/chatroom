package com.chatroom.services;

import javax.servlet.http.HttpServletRequest;

public interface RequestService {
    String getClientIp(HttpServletRequest request);
}
