
import org.apache.commons.lang3.Validate;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Protocol;
import redis.clients.jedis.exceptions.JedisConnectionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.net.InetSocketAddress;

public class RedisPublisher {
    private Logger log =LoggerFactory.getLogger(getClass());

    private String channel;
    private InetSocketAddress address = new InetSocketAddress("localhost", Protocol.DEFAULT_PORT);

    public RedisPublisher withAddress(final InetSocketAddress address) {
        this.address=address;
        return this;
    }
    
    public RedisPublisher withChannel(final String channel) {
        this.channel=channel;
        return this;
    }
    
    public void publishToRedis(final String message) throws JedisConnectionException{
        publishToRedis(channel, message);
    }
    
    public void publishToRedis(final String specificChannel, final String message) throws JedisConnectionException{
        Validate.notNull(specificChannel);
        Validate.notNull(address);
        log.trace("Publishing to redis channel {} : {}", specificChannel, message);
        final JedisPool jedisPool = new JedisPool(address.getHostName(), address.getPort());
        try (CloseableJedisPool pool = new CloseableJedisPool(jedisPool)) {
            final Long answer = pool.getResource().publish(specificChannel, message);
            log.debug("Message published (answer {}) to Redis channel {} : {}", new Object[] { answer,
                    specificChannel, message });
        }
    }
}
